import { useState, useEffect, useMemo } from 'react'
import Sidebar from './components/Sidebar'
import Main from './components/Main'

const App = () => {
  const textAreas = document.querySelectorAll('textarea') as NodeListOf<HTMLTextAreaElement>

  const [notes, setNotes] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  const addNote = (color: string) => {
    setNotes([{ title: '', bgColor: color, date: new Date() }, ...notes])
    if (textAreas.length) {
      textAreas[0].focus()
    }
  }

  const searchNotes = (title: string) => {
    setSearchQuery(title)
  }

  const filteredNotes = useMemo(() => {
    return searchQuery.length <= 0  ? notes : notes.filter((note) => note.title.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery, searchNotes])

  const updateNote = (e:any, index: number) => {
    setNotes(
      notes.map((note) => {
        if (notes.indexOf(note) === index) {
          note.title = e
        }
        return note
      })
    )
    localStorage.setItem('notes', JSON.stringify(notes))
  }

  const deleteNote = (index: number) => {
    const updatedNotes = notes.filter((note) => {
      return notes.indexOf(note) !== index
    })
    setNotes([...updatedNotes])
    localStorage.setItem('notes', JSON.stringify(updatedNotes))
  }

  useEffect(() => {
    const prevNotes = localStorage.getItem('notes') as string
    if (prevNotes) {
      const previousNotes = JSON.parse(prevNotes)
      return setNotes([...previousNotes])
    }
  }, [])

  return (
    <div className="App h-screen w-screen flex">
      <Sidebar addNote={addNote} />
      <Main notes={filteredNotes} updateNote={updateNote} deleteNote={deleteNote} searchNotes={searchNotes} />
    </div>
  )
}

export default App
