import { useState, useEffect } from 'react'
import { useTrail, animated } from 'react-spring'
import Sun from './Sun'
import Moon from './Moon'
import Device from './Device'

interface Props {
  addNote: (e: string) => void
}

const Sidebar = ({ addNote = (e) => {} }: Props) => {
  const [colorValues, setColorValues] = useState([
    '#fdba74',
    '#fca5a5',
    '#a78bfa',
    '#67e8f9',
    '#bbf7d0'
  ])
  const config = { mass: 5, tension: 2000, friction: 200 }
  const getCurrentTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches

  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setDark] = useState(getCurrentTheme())
  const [theme, setTheme] = useState('device')

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

  const setMode = (isDarkMode: boolean, theme: string) => {
    theme == 'device' ? localStorage.setItem('theme', 'device') : theme == 'dark' ?
      localStorage.setItem('theme', 'dark') : localStorage.setItem('theme', 'light')
    isDarkMode ? setDark(true) : setDark(false)
  }

  const toggleTheme = () => {
    if (theme == 'device') {
      setMode(false, 'light')
      setTheme('light')
    } else if (theme == 'light') {
      setMode(false, 'dark')
      setTheme('dark')
    } else {
      setMode(getCurrentTheme(), 'device')
      setTheme('device')
    }
  }

  useEffect(() => {
    // get initial theme from localStorage
    const initTheme = localStorage.getItem('theme')
    if (initTheme) {
      if (initTheme == 'device') {
        setDark(getCurrentTheme())
        setTheme('device')
      } else if (initTheme == 'dark') {
        setDark(true)
        setTheme('dark')
      } else {
        setDark(false)
        setTheme('light')
      }
    }
    isDark ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark')
  },[isDark, toggleTheme])
  
  return (
    <aside
      className="z-50 grow-0 fixed inset-y-0 left-0 flex flex-col items-center dark:bg-neutral-800 bg-white text-gray-700 shadow h-full px-4">

      <div className="h-16 flex items-center w-full justify-center font-normal text-neutral-950 dark:text-white">
        Notes
      </div>

      <ul className="flex flex-col items-center gap-y-2">
        <li>
          <button
            onClick={toggleColors}
            className={`
              transition-all
              bg-neutral-950
              dark:bg-white
              w-8
              h-8
              rounded-full
              text-white
              dark:text-neutral-950
              text-xl
              inline-flex
              items-center
              justify-center
              mb-4
              ${isOpen ? 'rotate-180' : ''}
            `}
          >
            +
          </button>
        </li>
        {
          isOpen && trail.map(({ x, height, ...rest }, index) => (
            <animated.li
              key={colorValues[index]}
              style={{ ...rest }}
            >
              <animated.button
                style={{ backgroundColor: colorValues[index] }}
                className="w-5 h-5 rounded-full"
                onClick={() => addNote(colorValues[index])}
              />
            </animated.li>
          ))
        }
      </ul>
      <button
        onClick={toggleTheme}
        className="mt-auto mb-8 w-8 h-8 rounded-full hover:bg-neutral-300/50 dark:hover:bg-neutral-600/50 inline-flex items-center justify-center"
      >
        { theme == 'device' ? 
          <span className="inline-flex items-center gap-x-2">
            <Device />
          </span> :
          theme == 'dark' ?
          <span className="inline-flex items-center gap-x-2">
            <Moon />
          </span> :
          <span className="inline-flex items-center gap-x-2">
            <Sun />
          </span>
        }
      </button>

    </aside>
  )
}

export default Sidebar