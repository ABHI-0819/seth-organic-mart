import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Checkbox from "@modules/common/components/checkbox"
import Input from "@modules/common/components/input"
import { mapKeys } from "lodash"
import React, { useEffect, useMemo, useRef, useState } from "react"
import AddressSelect from "../address-select"
import CountrySelect from "../country-select"

const ShippingAddress = ({
  customer,
  cart,
  checked,
  onChange,
}: {
  customer: HttpTypes.StoreCustomer | null
  cart: HttpTypes.StoreCart | null
  checked: boolean
  onChange: () => void
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({
    "shipping_address.first_name": cart?.shipping_address?.first_name || "",
    "shipping_address.last_name": cart?.shipping_address?.last_name || "",
    "shipping_address.address_1": cart?.shipping_address?.address_1 || "",
    "shipping_address.company": cart?.shipping_address?.company || "",
    "shipping_address.postal_code": cart?.shipping_address?.postal_code || "",
    "shipping_address.city": cart?.shipping_address?.city || "",
    "shipping_address.country_code":
      cart?.shipping_address?.country_code || "in",
    "shipping_address.province": cart?.shipping_address?.province || "",
    "shipping_address.phone": cart?.shipping_address?.phone || "",
    email: cart?.email || "",
  })

  const [locating, setLocating] = useState(false)
  const [pinLoading, setPinLoading] = useState(false)
  const [areaQuery, setAreaQuery] = useState("")
  const [locationStatus, setLocationStatus] = useState<{
    type: "success" | "info" | "error"
    text: string
  } | null>(null)
  const [postOffices, setPostOffices] = useState<any[]>([])
  const pinInputRef = useRef<HTMLInputElement | null>(null)

  const countriesInRegion = useMemo(
    () => cart?.region?.countries?.map((c) => c.iso_2),
    [cart?.region]
  )

  const addressesInRegion = useMemo(
    () =>
      customer?.addresses.filter(
        (a) => a.country_code && countriesInRegion?.includes(a.country_code)
      ),
    [customer?.addresses, countriesInRegion]
  )

  const setFormAddress = (
    address?: HttpTypes.StoreCartAddress,
    email?: string
  ) => {
    address &&
      setFormData((prevState: Record<string, any>) => ({
        ...prevState,
        "shipping_address.first_name": address?.first_name || "",
        "shipping_address.last_name": address?.last_name || "",
        "shipping_address.address_1": address?.address_1 || "",
        "shipping_address.company": address?.company || "",
        "shipping_address.postal_code": address?.postal_code || "",
        "shipping_address.city": address?.city || "",
        "shipping_address.country_code": address?.country_code || "in",
        "shipping_address.province": address?.province || "",
        "shipping_address.phone": address?.phone || "",
      }))

    email &&
      setFormData((prevState: Record<string, any>) => ({
        ...prevState,
        email: email,
      }))
  }

  useEffect(() => {
    if (cart && cart.shipping_address) {
      setFormAddress(cart?.shipping_address, cart?.email)
    }

    if (cart && !cart.email && customer?.email) {
      setFormAddress(undefined, customer.email)
    }
  }, [cart])

  // 1. Exact 6-Digit India Post PIN Code Lookup
  const lookupPincode = async (pincode: string, keepStreet = false) => {
    const cleanPin = pincode.trim()
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

        setFormData((prev) => ({
          ...prev,
          "shipping_address.postal_code": cleanPin,
          "shipping_address.city":
            primary.District || primary.Block || prev["shipping_address.city"],
          "shipping_address.province":
            primary.State || prev["shipping_address.province"],
          "shipping_address.country_code": "in",
          "shipping_address.address_1": keepStreet && prev["shipping_address.address_1"]
            ? prev["shipping_address.address_1"]
            : `${primary.Name}, ${primary.District}`,
        }))

        setLocationStatus({
          type: "success",
          text: `Verified PIN ${cleanPin}: ${primary.Name}, ${primary.District}, ${primary.State}. Tap your exact locality below if needed.`,
        })
      } else {
        setPostOffices([])
        setLocationStatus({
          type: "error",
          text: `Could not find PIN code ${cleanPin} in India Post directory.`,
        })
      }
    } catch (err) {
      // Ignore network error
    } finally {
      setPinLoading(false)
    }
  }

  // 2. Search Official PIN Code by Area / Suburb Name (e.g. "Kandivali East")
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

        setFormData((prev) => ({
          ...prev,
          "shipping_address.postal_code": primary.Pincode,
          "shipping_address.city": primary.District,
          "shipping_address.province": primary.State,
          "shipping_address.country_code": "in",
          "shipping_address.address_1":
            prev["shipping_address.address_1"] ||
            `${primary.Name}, ${primary.District}`,
        }))

        setLocationStatus({
          type: "success",
          text: `Found ${offices.length} area matches! Select your exact locality chip below to set PIN code.`,
        })
      } else {
        setLocationStatus({
          type: "info",
          text: `No post office matched "${cleanArea}". Try entering your 6-digit PIN code directly.`,
        })
      }
    } catch (e) {
    } finally {
      setPinLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (name === "shipping_address.postal_code" && value.trim().length === 6) {
      lookupPincode(value)
    }
  }

  // 3. Hardware GPS Location + India Post Suburb Verification
  const handleAutoLocate = async () => {
    setLocating(true)
    setLocationStatus(null)

    // Check if browser allows Hardware GPS (Requires HTTPS or localhost)
    if (
      typeof window !== "undefined" &&
      "geolocation" in navigator &&
      window.isSecureContext
    ) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const { latitude, longitude } = pos.coords
            // Use BigDataCloud + Nominatim in parallel for higher accuracy
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
              addr.city ||
              addr.town ||
              addr.city_district ||
              bdc.city ||
              ""
            const detectedState =
              addr.state || bdc.principalSubdivision || ""
            let detectedPin = (addr.postcode || bdc.postcode || "").replace(
              /\s+/g,
              ""
            )

            // Cross-verify suburb against India Post so OpenStreetMap never gives a neighboring wrong PIN!
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
                  const matchedOffices = poData[0].PostOffice
                  setPostOffices(matchedOffices)
                  detectedPin = matchedOffices[0].Pincode
                }
              } catch (e) {}
            }

            const streetLine = [building, road, suburb]
              .filter(Boolean)
              .join(", ")

            setFormData((prev) => ({
              ...prev,
              "shipping_address.address_1":
                streetLine || prev["shipping_address.address_1"],
              "shipping_address.city":
                detectedCity || prev["shipping_address.city"],
              "shipping_address.province":
                detectedState || prev["shipping_address.province"],
              "shipping_address.postal_code":
                detectedPin || prev["shipping_address.postal_code"],
              "shipping_address.country_code": "in",
            }))

            if (detectedPin && detectedPin.length === 6) {
              await lookupPincode(detectedPin, true)
            } else {
              setLocationStatus({
                type: "success",
                text: `GPS detected ${suburb || detectedCity}. Confirm your 6-digit PIN code below.`,
              })
            }
          } catch (err) {
            setLocationStatus({
              type: "info",
              text: "Could not reverse-geocode GPS. Type your 6-digit PIN code below for exact auto-fill.",
            })
          } finally {
            setLocating(false)
          }
        },
        () => {
          setLocating(false)
          setLocationStatus({
            type: "info",
            text: "Location permission denied. Type your 6-digit PIN code or Area Name below to auto-fill!",
          })
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      )
    } else {
      // On HTTP IP (http://82.29.165.210:4200), browsers block exact hardware GPS and IP lookup gives the wrong ISP PIN code!
      // So we only pre-fill City & State from network and never overwrite your PIN with a wrong ISP tower PIN.
      try {
        const res = await fetch("https://ipapi.co/json/")
        const data = await res.json()
        if (data?.city) {
          setFormData((prev) => ({
            ...prev,
            "shipping_address.city": prev["shipping_address.city"] || data.city,
            "shipping_address.province":
              prev["shipping_address.province"] || data.region,
            "shipping_address.country_code": "in",
          }))
        }
      } catch (e) {}

      setLocating(false)
      setLocationStatus({
        type: "info",
        text: "Exact street GPS requires HTTPS—type your 6-digit PIN (e.g. 400101) or Area Name below for 100% accurate India Post auto-fill!",
      })
      pinInputRef.current?.focus()
    }
  }

  return (
    <>
      {customer && (addressesInRegion?.length || 0) > 0 && (
        <Container className="mb-6 flex flex-col gap-y-4 p-5">
          <p className="text-small-regular">
            {`Hi ${customer.first_name}, do you want to use one of your saved addresses?`}
          </p>
          <AddressSelect
            addresses={customer.addresses}
            addressInput={
              mapKeys(formData, (_, key) =>
                key.replace("shipping_address.", "")
              ) as HttpTypes.StoreCartAddress
            }
            onSelect={setFormAddress}
          />
        </Container>
      )}

      {/* Smart Auto-Fetch & Area Search Bar */}
      <div className="mb-5 p-4 rounded-xl bg-[#FAF7F2] border border-stone-200/90 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#143625]/10 text-[#143625] flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-[#143625]">
                Verified India Post Address Auto-Fill
              </p>
              <p className="text-[11px] sm:text-xs text-stone-500">
                Enter your 6-digit PIN code, search your Suburb/Area name, or use GPS
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAutoLocate}
            disabled={locating}
            className="inline-flex items-center justify-center gap-2 bg-[#143625] hover:bg-[#0e271a] disabled:opacity-60 text-white text-xs font-medium px-4 py-2.5 rounded-lg transition shadow-2xs shrink-0 cursor-pointer"
          >
            <svg className={`w-4 h-4 ${locating ? "animate-spin" : ""}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364-5.364l-1.414 1.414M7.05 16.95l-1.414 1.414m11.314 0l-1.414-1.414M7.05 7.05L5.636 5.636" />
            </svg>
            {locating ? "Detecting..." : "Detect Location"}
          </button>
        </div>

        {/* Search by Suburb / Locality Name Input */}
        <div className="flex gap-2 pt-1">
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
            placeholder="Or type your Area / Suburb (e.g. Kandivali East, Borivali, Andheri)..."
            className="flex-1 bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-[#143625]"
          />
          <button
            type="button"
            onClick={() => searchByAreaName(areaQuery)}
            disabled={pinLoading}
            className="bg-stone-800 hover:bg-stone-900 text-white text-xs font-medium px-3.5 py-2 rounded-lg shrink-0 transition"
          >
            {pinLoading ? "Searching..." : "Find PIN"}
          </button>
        </div>
      </div>

      {locationStatus && (
        <div
          className={`mb-4 px-3.5 py-2.5 rounded-lg text-xs font-medium flex items-center justify-between gap-2 ${
            locationStatus.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : locationStatus.type === "error"
              ? "bg-rose-50 text-rose-800 border border-rose-200"
              : "bg-amber-50 text-amber-900 border border-amber-200"
          }`}
        >
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

      {/* Quick-Select Sub-Locality Chips (Sets BOTH Exact Locality AND Verified PIN Code!) */}
      {postOffices.length > 0 && (
        <div className="mb-5 p-3 bg-white rounded-lg border border-stone-200">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-2">
            Tap Your Exact Locality / Post Office to Auto-Fill:
          </p>
          <div className="flex flex-wrap items-center gap-1.5">
            {postOffices.slice(0, 8).map((po) => {
              const isSelected =
                formData["shipping_address.postal_code"] === po.Pincode &&
                formData["shipping_address.address_1"]?.includes(po.Name)
              return (
                <button
                  key={`${po.Name}-${po.Pincode}`}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      "shipping_address.postal_code": po.Pincode,
                      "shipping_address.address_1": `${po.Name}, ${po.District}`,
                      "shipping_address.city": po.District,
                      "shipping_address.province": po.State,
                      "shipping_address.country_code": "in",
                    }))
                  }
                  className={`px-3 py-1.5 rounded-full text-xs border transition ${
                    isSelected
                      ? "bg-[#143625] text-white border-[#143625]"
                      : "bg-[#FAF7F2] hover:border-[#143625] text-stone-800 border-stone-300"
                  }`}
                >
                  📍 {po.Name} ({po.Pincode})
                </button>
              )
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 small:grid-cols-2 gap-4">
        <Input
          label="First name"
          name="shipping_address.first_name"
          autoComplete="given-name"
          value={formData["shipping_address.first_name"]}
          onChange={handleChange}
          required
          data-testid="shipping-first-name-input"
        />
        <Input
          label="Last name"
          name="shipping_address.last_name"
          autoComplete="family-name"
          value={formData["shipping_address.last_name"]}
          onChange={handleChange}
          required
          data-testid="shipping-last-name-input"
        />
        <div className="relative" ref={pinInputRef}>
          <Input
            label={
              pinLoading
                ? "PIN / Postal code (Verifying with India Post...)"
                : "PIN / Postal code (6 digits)"
            }
            name="shipping_address.postal_code"
            autoComplete="postal-code"
            value={formData["shipping_address.postal_code"]}
            onChange={handleChange}
            required
            data-testid="shipping-postal-code-input"
          />
        </div>
        <Input
          label="City / District"
          name="shipping_address.city"
          autoComplete="address-level2"
          value={formData["shipping_address.city"]}
          onChange={handleChange}
          required
          data-testid="shipping-city-input"
        />
        <div className="small:col-span-2">
          <Input
            label="House / Flat No., Building, Street & Locality"
            name="shipping_address.address_1"
            autoComplete="address-line1"
            value={formData["shipping_address.address_1"]}
            onChange={handleChange}
            required
            data-testid="shipping-address-input"
          />
        </div>
        <Input
          label="Landmark / Apartment / Company (Optional)"
          name="shipping_address.company"
          value={formData["shipping_address.company"]}
          onChange={handleChange}
          autoComplete="organization"
          data-testid="shipping-company-input"
        />
        <Input
          label="State / Province"
          name="shipping_address.province"
          autoComplete="address-level1"
          value={formData["shipping_address.province"]}
          onChange={handleChange}
          required
          data-testid="shipping-province-input"
        />
        <CountrySelect
          name="shipping_address.country_code"
          autoComplete="country"
          region={cart?.region}
          value={formData["shipping_address.country_code"]}
          onChange={handleChange}
          required
          data-testid="shipping-country-select"
        />
        <Input
          label="Mobile Phone (10 digits for delivery updates)"
          name="shipping_address.phone"
          autoComplete="tel"
          value={formData["shipping_address.phone"]}
          onChange={handleChange}
          required
          data-testid="shipping-phone-input"
        />
      </div>

      <div className="my-8">
        <Checkbox
          label="Billing address same as shipping address"
          name="same_as_billing"
          checked={checked}
          onChange={onChange}
          data-testid="billing-address-checkbox"
        />
      </div>

      <div className="grid grid-cols-1 small:grid-cols-2 gap-4 mb-4">
        <Input
          label="Email"
          name="email"
          type="email"
          title="Enter a valid email address."
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          required
          data-testid="shipping-email-input"
        />
      </div>
    </>
  )
}

export default ShippingAddress
