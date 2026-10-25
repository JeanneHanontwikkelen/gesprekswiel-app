import React, { useState, createContext, useContext } from "react";

export function Card({ className = "", children, ...props }) {
  return (
    <div className={"rounded-xl border bg-white text-slate-950 shadow-sm " + className} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ className = "", children }) {
  return <div className={"flex flex-col space-y-1.5 p-6 " + className}>{children}</div>;
}

export function CardTitle({ className = "", children }) {
  return <h3 className={"font-semibold leading-none tracking-tight " + className}>{children}</h3>;
}

export function CardContent({ className = "", children }) {
  return <div className={"p-6 pt-0 " + className}>{children}</div>;
}

export function Button({ className = "", variant = "default", size = "default", children, ...props }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors cursor-pointer disabled:opacity-50";
  const variants = {
    default: "bg-slate-900 text-white hover:bg-slate-800",
    outline: "border border-slate-200 bg-white text-slate-900 hover:bg-slate-100",
  };
  const sizes = { default: "h-9 px-4 py-2 text-sm", sm: "h-8 px-3 text-xs" };
  const variantClasses = variants[variant] || variants.default;
  const sizeClasses = sizes[size] || sizes.default;
  return (
    <button className={base + " " + variantClasses + " " + sizeClasses + " " + className} {...props}>
      {children}
    </button>
  );
}

export function Badge({ className = "", variant = "default", children }) {
  const variants = {
    default: "bg-slate-900 text-white",
    secondary: "bg-slate-100 text-slate-900",
    outline: "border border-slate-200 text-slate-700",
  };
  const variantClasses = variants[variant] || variants.default;
  return (
    <span
      className={
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold " + variantClasses + " " + className
      }
    >
      {children}
    </span>
  );
}

export function Progress({ value = 0, className = "" }) {
  return (
    <div className={"h-2 w-full overflow-hidden rounded-full bg-slate-200 " + className}>
      <div className="h-full bg-slate-900 transition-all" style={{ width: value + "%" }} />
    </div>
  );
}

const TabsCtx = createContext({ value: "", setValue: function () {} });

export function Tabs({ defaultValue, className = "", children }) {
  const [state, setState] = useState(defaultValue);
  return (
    <TabsCtx.Provider value={{ value: state, setValue: setState }}>
      <div className={className}>{children}</div>
    </TabsCtx.Provider>
  );
}

export function TabsList({ className = "", children }) {
  return (
    <div
      className={
        "inline-flex h-10 items-center justify-center rounded-md bg-slate-100 p-1 text-slate-500 " + className
      }
    >
      {children}
    </div>
  );
}

export function TabsTrigger({ value, className = "", children }) {
  const ctx = useContext(TabsCtx);
  const active = ctx.value === value;
  return (
    <button
      type="button"
      onClick={function () { ctx.setValue(value); }}
      className={
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all cursor-pointer " +
        (active ? "bg-white text-slate-900 shadow " : "hover:text-slate-900 ") + className
      }
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, className = "", children }) {
  const ctx = useContext(TabsCtx);
  if (ctx.value !== value) return null;
  return <div className={"mt-2 " + className}>{children}</div>;
}
