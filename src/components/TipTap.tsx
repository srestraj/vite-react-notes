import { useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Bold from './icons/Bold'
import Italics from './icons/Italics'
import OrderedList from './icons/OrderedList'
import UnOrderedList from './icons/UnorderedList'
import Sort from './icons/Sort'

interface Props {
  content: string,
  updateContent: (content: any) => void
}

const Tiptap = ({ content, updateContent = (content) => {} }: Props) => {

  const [isDropdownOpen, setDropdownOpen] = useState(false)

  const toggleHeading = (value: any) => {
    editor?.chain().focus().toggleHeading({ level: value }).run()
    setDropdownOpen(false)
  }


  const editor = useEditor({
    content: content,
    extensions: [
      StarterKit
    ],
    editorProps: {},
    onUpdate: () => {
      updateContent(editor?.getHTML())
    }
  })

  return (
    <div>
       <div className="flex flex-wrap gap-2 p-2 w-full mt-1">
        <div className="relative">
          <button className="inline-flex items-center gap-2" onClick={() => setDropdownOpen((value) => value = !value)}>
            Normal <Sort />
          </button>
          {
            isDropdownOpen &&
            <div
              className="
                z-10
                absolute
                w-[160px]
                bg-neutral-100
                dark:bg-neutral-700
                rounded-2xl
                border
                border-netral-500
                dark:border-neutral-600
                overflow-hidden
              "
            >
              <ul className="list-none list-inside w-full pl-0 text-neutral-700 dark:text-neutral-200">
                <li
                  className="px-4 hover:bg-neutral-300 dark:hover:bg-neutral-600"
                  role="button"
                  onClick={() => toggleHeading(1)}
                >
                  Heading 1
                </li>
                <li
                  className="px-4 hover:bg-neutral-300 dark:hover:bg-neutral-600"
                  role="button"
                  onClick={() => toggleHeading(2)}
                >
                  Heading 2
                </li>
                <li
                  className="px-4 hover:bg-neutral-300 dark:hover:bg-neutral-600"
                  role="button"
                  onClick={() => toggleHeading(3)}
                >
                  Heading 3
                </li>
                <li
                  className="px-4 hover:bg-neutral-300 dark:hover:bg-neutral-600"
                  role="button"
                  onClick={() => toggleHeading(6)}
                >
                  Normal
                </li>
              </ul>
            </div>
          }
        </div>
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          <Bold />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          <Italics />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        >
          <OrderedList />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        >
          <UnOrderedList />
        </button>
      </div>
      <EditorContent className="editable-content" editor={editor} />
    </div>
  )
}

export default Tiptap