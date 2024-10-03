import React from "react"

export const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className="w-3/5 rounded-lg border bg-card text-card-foreground shadow-sm"
    {...props}
  />
))

Card.displayName = "Card"

export const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className="flex flex-col space-y-1.5 p-6"
    {...props}
  />
))

CardHeader.displayName = "CardHeader"

export const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className="text-2xl font-semibold leading-none tracking-tight"
    {...props}
  />
))

CardTitle.displayName = "CardTitle"

export const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className="p-6 pt-0" {...props} />
))

CardContent.displayName = "CardContent"

export const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className="flex items-center p-6 pt-0"
    {...props}
  />
))

CardFooter.displayName = "CardFooter"