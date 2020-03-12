import React from 'react'

// getCurrentYear :: String
const getCurrentYear = () => (new Date()).getFullYear()

// Footer :: () -> React.Component
export default () =>
  <footer className="py-5 bg-dark">
    <div className="container">
      <p className="m-0 text-center text-white">
        Copyright &copy; Joris Langlois {getCurrentYear()}
      </p>
    </div>
  </footer>
