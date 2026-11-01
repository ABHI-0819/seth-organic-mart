"use client"

import React, { useEffect, useState, useActionState } from "react"
import { PencilSquare as Edit, Trash } from "@medusajs/icons"
import { Button, Heading, Text, clx } from "@medusajs/ui"

import useToggleState from "@lib/hooks/use-toggle-state"
import CountrySelect from "@modules/checkout/components/country-select"
import Input from "@modules/common/components/input"
import Modal from "@modules/common/components/modal"
import Spinner from "@modules/common/icons/spinner"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { HttpTypes } from "@medusajs/types"
import {
  deleteCustomerAddress,
  updateCustomerAddress,
} from "@lib/data/customer"

type EditAddressProps = {
  region: HttpTypes.StoreRegion
  address: HttpTypes.StoreCustomerAddress
  isActive?: boolean
}

const EditAddress: React.FC<EditAddressProps> = ({
  region,
  address,
  isActive = false,
}) => {
  const [removing, setRemoving] = useState(false)
  const [successState, setSuccessState] = useState(false)
  const { state, open, close: closeModal } = useToggleState(false)

  const [formState, formAction] = useActionState(updateCustomerAddress, {
    success: false,
    error: null,
    addressId: address.id,
  })

  const [postalCode, setPostalCode] = useState(address.postal_code || "")
  const [city, setCity] = useState(address.city || "")
  const [province, setProvince] = useState(address.province || "")
  const [address1, setAddress1] = useState(address.address_1 || "")
  const [countryCode, setCountryCode] = useState(address.country_code || "in")
  const [pinLoading, setPinLoading] = useState(false)
  const [postOffices, setPostOffices] = useState<any[]>([])

  const close = () => {
    setSuccessState(false)
    setPostOffices([])
    closeModal()
  }

  useEffect(() => {
    if (successState) {
      close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successState])

  useEffect(() => {
    if (formState.success) {
      setSuccessState(true)
    }
  }, [formState])

  const removeAddress = async () => {
    setRemoving(true)
    await deleteCustomerAddress(address.id)
    setRemoving(false)
  }

  const lookupPincode = async (pin: string) => {
    const cleanPin = pin.trim()
    if (!/^[1-9][0-9]{5}$/.test(cleanPin)) {
      setPostOffices([])
      return
    }
    setPinLoading(true)
    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${cleanPin}`)
      const data = await res.json()
      if (data?.[0]?.Status === "Success" && data[0].PostOffice?.length > 0) {
        const offices = data[0].PostOffice
        const primary = offices[0]
        setPostOffices(offices)
        setPostalCode(cleanPin)
        setCity(primary.District || primary.Block || "")
        setProvince(primary.State || "")
        setCountryCode("in")
      }
    } catch (e) {
    } finally {
      setPinLoading(false)
    }
  }

  return (
    <>
      <div
        className={clx(
          "border rounded-rounded p-5 min-h-[220px] h-full w-full flex flex-col justify-between transition-colors",
          {
            "border-gray-900": isActive,
          }
        )}
        data-testid="address-container"
      >
        <div className="flex flex-col">
          <Heading
            className="text-left text-base-semi"
            data-testid="address-name"
          >
            {address.first_name} {address.last_name}
          </Heading>
          {address.company && (
            <Text
              className="txt-compact-small text-ui-fg-base"
              data-testid="address-company"
            >
              {address.company}
            </Text>
          )}
          <Text className="flex flex-col text-left text-base-regular mt-2">
            <span data-testid="address-address">
              {address.address_1}
              {address.address_2 && <span>, {address.address_2}</span>}
            </span>
            <span data-testid="address-postal-city">
              {address.postal_code}, {address.city}
            </span>
            <span data-testid="address-province-country">
              {address.province && `${address.province}, `}
              {address.country_code?.toUpperCase()}
            </span>
          </Text>
        </div>
        <div className="flex items-center gap-x-4">
          <button
            className="text-small-regular text-ui-fg-base flex items-center gap-x-2"
            onClick={open}
            data-testid="address-edit-button"
          >
            <Edit />
            Edit
          </button>
          <button
            className="text-small-regular text-ui-fg-base flex items-center gap-x-2"
            onClick={removeAddress}
            data-testid="address-delete-button"
          >
            {removing ? <Spinner /> : <Trash />}
            Remove
          </button>
        </div>
      </div>

      <Modal isOpen={state} close={close} data-testid="edit-address-modal">
        <Modal.Title>
          <Heading className="mb-2">Edit address</Heading>
        </Modal.Title>
        <form action={formAction} className="flex flex-col flex-1 min-h-0 overflow-hidden">
          <input type="hidden" name="addressId" value={address.id} />
          <Modal.Body>
            <div className="grid grid-cols-1 gap-y-3 ">
              {postOffices.length > 0 && (
                <div className="p-2.5 bg-[#FAF7F2] rounded-lg border border-stone-200">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-500 mb-1.5">
                    Tap Locality to Auto-Fill:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {postOffices.slice(0, 6).map((po) => (
                      <button
                        key={`${po.Name}-${po.Pincode}`}
                        type="button"
                        onClick={() => {
                          setPostalCode(po.Pincode)
                          setAddress1(`${po.Name}, ${po.District}`)
                          setCity(po.District)
                          setProvince(po.State)
                        }}
                        className="px-2.5 py-1 rounded-full text-[11px] bg-white hover:bg-[#143625] hover:text-white text-stone-800 border border-stone-300 transition"
                      >
                        📍 {po.Name} ({po.Pincode})
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-3">
                <Input
                  label="First name"
                  name="first_name"
                  required
                  autoComplete="given-name"
                  defaultValue={address.first_name || undefined}
                  data-testid="first-name-input"
                />
                <Input
                  label="Last name"
                  name="last_name"
                  required
                  autoComplete="family-name"
                  defaultValue={address.last_name || undefined}
                  data-testid="last-name-input"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-3">
                <Input
                  label={pinLoading ? "PIN code (Verifying...)" : "PIN / Postal code (6 digits)"}
                  name="postal_code"
                  required
                  value={postalCode}
                  onChange={(e) => {
                    setPostalCode(e.target.value)
                    if (e.target.value.trim().length === 6) {
                      lookupPincode(e.target.value)
                    }
                  }}
                  autoComplete="postal-code"
                  data-testid="postal-code-input"
                />
                <Input
                  label="City / District"
                  name="city"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  autoComplete="locality"
                  data-testid="city-input"
                />
              </div>
              <Input
                label="Address"
                name="address_1"
                required
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                autoComplete="address-line1"
                data-testid="address-1-input"
              />
              <Input
                label="Apartment, suite, etc."
                name="address_2"
                autoComplete="address-line2"
                defaultValue={address.address_2 || undefined}
                data-testid="address-2-input"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-3">
                <Input
                  label="Province / State"
                  name="province"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  autoComplete="address-level1"
                  data-testid="state-input"
                />
                <Input
                  label="Company"
                  name="company"
                  autoComplete="organization"
                  defaultValue={address.company || undefined}
                  data-testid="company-input"
                />
              </div>
              <CountrySelect
                name="country_code"
                region={region}
                required
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                autoComplete="country"
                data-testid="country-select"
              />
              <Input
                label="Phone"
                name="phone"
                autoComplete="phone"
                defaultValue={address.phone || undefined}
                data-testid="phone-input"
              />
            </div>
            {formState.error && (
              <div className="text-rose-500 text-small-regular py-2">
                {formState.error}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <div className="flex gap-3 mt-6">
              <Button
                type="reset"
                variant="secondary"
                onClick={close}
                className="h-10"
                data-testid="cancel-button"
              >
                Cancel
              </Button>
              <SubmitButton data-testid="save-button" className="bg-[#143625] hover:bg-[#0e271a] text-white">
                Save
              </SubmitButton>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default EditAddress
