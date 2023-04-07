interface Props {
  notes: any,
  updateNote: (e: string, index: number) => void,
  deleteNote: (index: number) => void,
  searchNotes: (title: string) => void
}

const Main = ({ notes, updateNote = (e, index) => {}, deleteNote = (index) => {}, searchNotes = (title) => {} }:Props) => {
  return (
    <div className="w-full absolute top-0 right-0 grow pl-20">
      <div className="md:py-5 md:px-12 py-5 w-full px-8">
        <input
          className="
            py-3
            focus:outline-none
            w-full
            border-0
            text-xl
            bg-transparent
            text-neutral-950
            placeholder:text-neutral-700
          "
          type="text"
          placeholder="Search notes..."
          onChange={(e: any) => searchNotes(e.target.value)}
        />
        <h1 className="md:text-4xl text-2xl font-normal my-8">
          Your Notes
        </h1>
      </div>
      {
        
      }
      <div className="lg:gap-4 gap-3 columns-1 md:columns-2 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5 mx-auto px-5">
        {
          !notes.length ?
            <div className="relative px-5 text-lg font-light">
              <h3>No notes found 🙁</h3>
            </div> :
          notes.map((note: any, index: number) =>
            <div className="relative rounded-xl px-5 py-10" key={index} style={{ backgroundColor: note.bgColor }}>
              <button
                onClick={() => deleteNote(index)}
                className="
                  absolute
                  top-2
                  right-2
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
              <input
                className="
                  py-3
                  focus:outline-none
                  w-full
                  border-0
                  text-xl
                  bg-transparent
                  text-neutral-950
                  placeholder:text-neutral-700
                "
                type="text"
                onChange={(e: any) => updateNote(e, index)}
                value={note.title}
                placeholder="Add note"
                autoFocus={!note.title.length}
              />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Main