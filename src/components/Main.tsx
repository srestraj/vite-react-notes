import moment from 'moment'
import Tiptap from './TipTap'

interface Props {
  notes: any,
  updateNote: (e: string, index: number) => void,
  deleteNote: (index: number) => void,
  searchNotes: (title: string) => void
}

const Main = ({ notes, updateNote = (e, index) => {}, deleteNote = (index) => {}, searchNotes = (title) => {} }:Props) => {
  return (
    <div className="w-full absolute top-0 right-0 grow pl-20">
      <div className="md:px-12 md:py-3 py-2 w-full px-8 sticky top-0 bg-white dark:bg-neutral-800 z-10">
        <div className="inline-flex items-center gap-x-3">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 fill-neutral-700 dark:fill-neutral-100">
          <path d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z"/>
        </svg>
          <input
            className="
              py-3
              focus:outline-none
              w-full
              border-0
              text-base
              bg-transparent
              text-neutral-950
              placeholder:text-neutral-700
              dark:text-neutral-100
              dark:placeholder:text-neutral-400
            "
            type="text"
            placeholder="Search notes"
            onChange={(e: any) => searchNotes(e.target.value)}
          />
        </div>
        <h1 className="md:text-4xl text-2xl font-normal my-8 text-neutral-950 dark:text-white">
          Your Notes
        </h1>
      </div>
      {
        
      }
      <div className="lg:gap-4 gap-3 xl:grid-cols-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 md:px-8 px-5">
        {
          !notes.length ?
            <div className="relative md:px-5 px-4 text-lg font-light text-neutral-800 dark:text-neutral-100">
              <h3>No notes found 🙁</h3>
            </div> :
          notes.map((note: any, index: number) =>
            <div className="relative rounded-3xl px-5" key={index} style={{ backgroundColor: note.bgColor }}>
              <button
                onClick={() => deleteNote(index)}
                className="
                  absolute
                  top-4
                  right-4
                  w-6
                  h-6
                  rounded-full
                  transition-all
                  hover:bg-neutral-950/40
                  group
                  inline-flex
                  items-center
                  justify-center
                "
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="group-hover:fill-white transition-all w-5 h-5">
                  <path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z"
                  />
                </svg>
              </button>
              <div
                className="
                  prose
                  max-w-none 
                  prose-li:text-base
                  prose-li:leading-7
                  prose-li:md:leading-9
                  prose-p:text-base
                  prose-p:leading-7
                  prose-p:font-normal
                  text-neutral-800
                  bg-transparent
                "
              >
                <Tiptap
                  content={note.title}
                  updateContent={(e) => updateNote(e, index)}
                  isFocused={index == 0 && !note.title.length}
                />
              </div>
              {
                note.date &&
                <p className="py-5">
                  { moment(note.date).fromNow() }
                </p>
              }
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Main