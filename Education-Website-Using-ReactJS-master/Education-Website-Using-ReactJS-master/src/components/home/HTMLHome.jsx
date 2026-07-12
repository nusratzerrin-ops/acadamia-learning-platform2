import React from "react"

const HTMLHome = () => {
  return (
    <div style={{ width: "100%", minHeight: "100vh" }}>
      <iframe
        src="/mainhome.html"
        style={{
          width: "100%",
          height: "100vh",
          border: "none",
          overflow: "hidden",
        }}
        title="Main Home"
      />
    </div>
  )
}

export default HTMLHome
