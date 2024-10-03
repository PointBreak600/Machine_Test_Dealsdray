import React from "react"

const Button = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <button
      className="border border-gray-800 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
      ref={ref}
      {...props}
    />
  )
})

Button.displayName = "Button"
export default Button