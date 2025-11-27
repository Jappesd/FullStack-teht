import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef(({ children, buttonLabel }, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  //expose togglevisibility to parent via refffff
  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }))

  return (
    <div>
      {!visible && (
        <button className="create-blog-btn" onClick={toggleVisibility}>
          {buttonLabel}
        </button>
      )}
      {visible && (
        <div>
          {children}
          <button className="delete-btn" onClick={toggleVisibility}>
            cancel
          </button>
        </div>
      )}
    </div>
  )
})

export default Togglable
