"use client"

import { Plus } from "@medusajs/icons"
import { Button } from "@medusajs/ui"
import { useEffect, useState, useActionState } from "react"

import useToggleState from "@lib/hooks/use-toggle-state"
import CountrySelect from "@modules/checkout/components/country-select"
import Input from "@modules/common/components/input"
import Modal from "@modules/common/components/modal"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { HttpTypes } from "@medusajs/types"
import { addCustomerAddress } from "@lib/data/customer"

const AddAddress = ({
  region,
  addresses,
}: {
  region: HttpTypes.StoreRegion
  addresses: HttpTypes.StoreCustomerAddress[]
}) => {
  const [successState, setSuccessState] = useState(false)
  const { state, open, close: closeModal } = useToggleState(false)

  const [formState, formAction] = useActionState(addCustomerAddress, {
    isDefaultShipping: addresses.length === 0,
    success: false,
    error: null,
  })

  const [postalCode, setPostalCode] = useState("")
  const [city, setCity] = useState("")
  const [province, setProvince] = useState("")
  const [address1, setAddress1] = useState("")
  const [countryCode, setCountryCode] = useState("in")

  const [locating, setLocating] = useState(false)
  const [pinLoading, setPinLoading] = useState(false)
  const [areaQuery, setAreaQuery] = useState("")
  const [postOffices, setPostOffices] = useState<any[]>([])
  const [locationStatus, setLocationStatus] = useState<{
    type: "success" | "info" | "error"
    text: string
  } | null>(null)

  const close = () => {
    setSuccessState(false)
    setLocationStatus(null)
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

  const lookupPincode = async (pin: string, keepStreet = false) => {
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
        if (!keepStreet || !address1) {
          setAddress1(`${primary.Name}, ${primary.District}`)
        }
        setLocationStatus({
          type: "success",
          text: `Verified PIN ${cleanPin}: ${primary.Name}, ${primary.District}`,
        })
      } else {
        setPostOffices([])
        setLocationStatus({
          type: "error",
          text: `PIN code ${cleanPin} not found.`,
        })
      }
    } catch (e) {
    } finally {
      setPinLoading(false)
    }
  }

  const searchByAreaName = async (branchName: string) => {
    const cleanArea = branchName.trim()
    if (cleanArea.length < 3) return
    setPinLoading(true)
    try {
      const res = await fetch(
        `https://api.postalpincode.in/postoffice/${encodeURIComponent(cleanArea)}`
      )
      const data = await res.json()
      if (data?.[0]?.Status === "Success" && data[0].PostOffice?.length > 0) {
        const offices = data[0].PostOffice
        const primary = offices[0]
        setPostOffices(offices)
        setPostalCode(primary.Pincode)
        setCity(primary.District)
        setProvince(primary.State)
        setCountryCode("in")
        if (!address1) {
          setAddress1(`${primary.Name}, ${primary.District}`)
        }
        setLocationStatus({
          type: "success",
          text: `Found ${offices.length} localities! Tap your area chip below.`,
        })
      } else {
        setLocationStatus({
          type: "info",
          text: `No match for "${cleanArea}". Enter your 6-digit PIN below.`,
        })
      }
    } catch (e) {
    } finally {
      setPinLoading(false)
    }
  }

  const handleAutoLocate = async () => {
    setLocating(true)
    setLocationStatus(null)

    if (
      typeof window !== "undefined" &&
      "geolocation" in navigator &&
      window.isSecureContext
    ) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const { latitude, longitude } = pos.coords
            const [nomRes, bdcRes] = await Promise.allSettled([
              fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
                { headers: { "Accept-Language": "en" } }
              ).then((r) => r.json()),
              fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
              ).then((r) => r.json()),
            ])

            const nom = nomRes.status === "fulfilled" ? nomRes.value : {}
            const bdc = bdcRes.status === "fulfilled" ? bdcRes.value : {}
            const addr = nom?.address || {}

            const suburb =
              addr.suburb ||
              addr.neighbourhood ||
              addr.residential ||
              bdc.locality ||
              ""
            const road = addr.road || addr.pedestrian || ""
            const building = addr.building || addr.house_number || ""
            const detectedCity =
              addr.city || addr.town || addr.city_district || bdc.city || ""
            const detectedState =
              addr.state || bdc.principalSubdivision || ""
            let detectedPin = (addr.postcode || bdc.postcode || "").replace(
              /\s+/g,
              ""
            )

            if (suburb) {
              try {
                const poRes = await fetch(
                  `https://api.postalpincode.in/postoffice/${encodeURIComponent(
                    suburb
                  )}`
                )
                const poData = await poRes.json()
                if (
                  poData?.[0]?.Status === "Success" &&
                  poData[0].PostOffice?.length > 0
                ) {
                  setPostOffices(poData[0].PostOffice)
                  detectedPin = poData[0].PostOffice[0].Pincode
                }
              } catch (e) {}
            }

            const streetLine = [building, road, suburb]
              .filter(Boolean)
              .join(", ")

            if (streetLine) setAddress1(streetLine)
            if (detectedCity) setCity(detectedCity)
            if (detectedState) setProvince(detectedState)
            if (detectedPin) setPostalCode(detectedPin)
            setCountryCode("in")

            if (detectedPin && detectedPin.length === 6) {
              await lookupPincode(detectedPin, true)
            } else {
              setLocationStatus({
                type: "success",
                text: `Detected ${suburb || detectedCity}. Confirm 6-digit PIN below.`,
              })
            }
          } catch (err) {
            setLocationStatus({
              type: "info",
              text: "Type your 6-digit PIN code below for auto-fill.",
            })
          } finally {
            setLocating(false)
          }
        },
        () => {
          setLocating(false)
          setLocationStatus({
            type: "info",
            text: "Type your 6-digit PIN or Suburb name above to auto-fill!",
          })
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      )
    } else {
      try {
        const res = await fetch("https://ipapi.co/json/")
        const data = await res.json()
        if (data?.city) {
          if (!city) setCity(data.city)
          if (!province) setProvince(data.region || "")
          setCountryCode("in")
        }
      } catch (e) {}
      setLocating(false)
      setLocationStatus({
        type: "info",
        text: "Type your 6-digit PIN or Suburb name above for verified India Post auto-fill!",
      })
    }
  }

  return (
    <>
      <button
        className="border border-ui-border-base rounded-rounded p-5 min-h-[220px] h-full w-full flex flex-col justify-between hover:border-[#143625] transition"
        onClick={open}
        data-testid="add-address-button"
      >
        <span className="text-base-semi text-[#143625]">New address</span>
        <Plus className="text-[#143625]" />
      </button>

      <Modal isOpen={state} close={close} data-testid="add-address-modal">
        <Modal.Title>Add New Address</Modal.Title>
        <form action={formAction} className="flex flex-col flex-1 min-h-0 overflow-hidden">
          <Modal.Body>
            <div className="flex flex-col gap-y-3.5">
              {/* Auto-Fetch & Suburb Search Box */}
              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-stone-200/90 space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#143625]">
                      Fast Address Auto-Fill
                    </p>
                    <p className="text-[11px] text-stone-500 truncate">
                      Search Suburb, enter PIN, or use GPS
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAutoLocate}
                    disabled={locating}
                    className="inline-flex items-center gap-1.5 bg-[#143625] hover:bg-[#0e271a] disabled:opacity-60 text-white text-xs font-medium px-3 py-2 rounded-lg transition shrink-0"
                  >
                    📍 {locating ? "Detecting..." : "Auto-Detect"}
                  </button>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={areaQuery}
                    onChange={(e) => setAreaQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        searchByAreaName(areaQuery)
                      }
                    }}
                    placeholder="Search Suburb / Area (e.g. Kandivali)..."
                    className="flex-1 min-w-0 bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-[#143625]"
                  />
                  <button
                    type="button"
                    onClick={() => searchByAreaName(areaQuery)}
                    disabled={pinLoading}
                    className="bg-stone-800 hover:bg-stone-900 text-white text-xs font-medium px-3.5 py-2 rounded-lg shrink-0"
                  >
                    {pinLoading ? "..." : "Find PIN"}
                  </button>
                </div>
              </div>

              {locationStatus && (
                <div className="px-3 py-2 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-900 border border-emerald-200 flex items-center justify-between gap-2">
                  <span>{locationStatus.text}</span>
                  <button
                    type="button"
                    onClick={() => setLocationStatus(null)}
                    className="text-stone-400 hover:text-stone-700 font-bold"
                  >
                    ✕
                  </button>
                </div>
              )}

              {postOffices.length > 0 && (
                <div className="p-2.5 bg-white rounded-lg border border-stone-200">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-500 mb-1.5">
                    Tap Your Locality to Auto-Fill:
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
                          setCountryCode("in")
                        }}
                        className="px-2.5 py-1 rounded-full text-[11px] bg-[#FAF7F2] hover:bg-[#143625] hover:text-white text-stone-800 border border-stone-300 transition"
                      >
                        📍 {po.Name} ({po.Pincode})
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2.5">
                <Input
                  label="First name"
                  name="first_name"
                  required
                  autoComplete="given-name"
                  data-testid="first-name-input"
                />
                <Input
                  label="Last name"
                  name="last_name"
                  required
                  autoComplete="family-name"
                  data-testid="last-name-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <Input
                  label={pinLoading ? "Verifying PIN..." : "PIN Code (6 digits)"}
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
                label="Flat / House No., Street & Locality"
                name="address_1"
                required
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                autoComplete="address-line1"
                data-testid="address-1-input"
              />

              <Input
                label="Landmark / Apartment (Optional)"
                name="address_2"
                autoComplete="address-line2"
                data-testid="address-2-input"
              />

              <div className="grid grid-cols-2 gap-2.5">
                <Input
                  label="State / Province"
                  name="province"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  autoComplete="address-level1"
                  data-testid="state-input"
                />
                <CountrySelect
                  region={region}
                  name="country_code"
                  required
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  autoComplete="country"
                  data-testid="country-select"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <Input
                  label="Mobile Phone"
                  name="phone"
                  autoComplete="phone"
                  data-testid="phone-input"
                />
                <Input
                  label="Company (Optional)"
                  name="company"
                  autoComplete="organization"
                  data-testid="company-input"
                />
              </div>

              {formState.error && (
                <div
                  className="text-rose-500 text-small-regular py-1"
                  data-testid="address-error"
                >
                  {formState.error}
                </div>
              )}
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button
              type="reset"
              variant="secondary"
              onClick={close}
              className="h-10 px-5"
              data-testid="cancel-button"
            >
              Cancel
            </Button>
            <SubmitButton
              data-testid="save-button"
              className="h-10 px-6 bg-[#143625] hover:bg-[#0e271a] text-white"
            >
              Save Address
            </SubmitButton>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default AddAddress
