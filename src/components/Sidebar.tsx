import { useState } from 'react'
import { useTrail, animated } from 'react-spring'

interface Props {
  addNote: (e: string) => void
}

const Sidebar = ({ addNote = (e) => {} }: Props) => {
  const [colorValues, setColorValues] = useState([
    '#fdba74',
    '#ea580c',
    '#a78bfa',
    '#67e8f9',
    '#bbf7d0'
  ])
  const config = { mass: 5, tension: 2000, friction: 200 }

  const [isOpen, setIsOpen] = useState(false)

  const trail = useTrail(colorValues.length, {
    config,
    opacity: isOpen ? 1 : 0,
    x: isOpen ? 0 : 20,
    height: isOpen ? 80 : 0,
    from: { opacity: 0, x: 20, height: 0 }
  })

  const toggleColors = () => {
    setIsOpen((value) => value = !value)
  }
  
  return (
    <aside
      className="z-50 grow-0 fixed inset-y-0 left-0 flex flex-col items-center bg-white text-gray-700 shadow h-full px-4">

      <div className="h-16 flex items-center w-full justify-center font-semibold">
        Notes
      </div>

      <ul className="flex flex-col items-center gap-y-2">
        <li>
          <button onClick={toggleColors} className="transition-all bg-neutral-950 w-8 h-8 rounded-full text-white text-xl inline-flex items-center justify-center mb-4">
            {!isOpen ? '+' : '-'}
          </button>
        </li>
        {
          isOpen && trail.map(({ x, height, ...rest }, index) => (
            <animated.li
              key={colorValues[index]}
              style={{ ...rest }}
              className="trails-text"
            >
              <animated.button
                style={{ backgroundColor: colorValues[index] }}
                className="trails-text w-4 h-4 rounded-full"
                onClick={() => addNote(colorValues[index])}
              />
            </animated.li>
          ))
        }
      </ul>

    </aside>
  )
}

export default Sidebar