import { Container } from "@medusajs/ui"

const SkeletonProductPreview = () => {
  return (
    <div className="animate-pulse flex flex-col h-full bg-white rounded-2xl border border-stone-200/80 p-3 shadow-xs">
      <div className="aspect-square w-full rounded-xl bg-stone-200/70" />
      <div className="flex flex-col gap-2 mt-3 flex-1 justify-between">
        <div className="space-y-1.5">
          <div className="w-16 h-3 bg-stone-200/60 rounded-full" />
          <div className="w-full h-4 bg-stone-200/70 rounded-md" />
          <div className="w-2/3 h-4 bg-stone-200/70 rounded-md" />
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-stone-100">
          <div className="w-20 h-5 bg-stone-200/80 rounded-md" />
          <div className="w-8 h-8 rounded-full bg-stone-200/60" />
        </div>
      </div>
    </div>
  )
}

export default SkeletonProductPreview
