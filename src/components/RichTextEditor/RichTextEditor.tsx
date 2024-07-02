'use client';

import { Separator } from '@components/ui/separator';
import { Toggle } from '@components/ui/toggle';
import cn from '@lib/utils';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  BoldIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  StrikethroughIcon,
} from 'lucide-react';
import { useEffect } from 'react';

const RichTextEditorToolbar = ({ editor }: { editor: Editor }) => {
  return (
    <div className="flex flex-row items-center gap-1 rounded-b-[0.375rem] bg-primary-super-light p-1">
      <Toggle
        variant="editor"
        size="sm"
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <BoldIcon className="h-4 w-4" />
      </Toggle>
      <Toggle
        variant="editor"
        size="sm"
        pressed={editor.isActive('italic')}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <ItalicIcon className="h-4 w-4" />
      </Toggle>
      <Toggle
        variant="editor"
        size="sm"
        pressed={editor.isActive('strike')}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <StrikethroughIcon className="h-4 w-4" />
      </Toggle>
      <Separator orientation="vertical" className="h-8 w-[1px]" />
      <Toggle
        variant="editor"
        size="sm"
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <ListIcon className="h-4 w-4" />
      </Toggle>
      <Toggle
        variant="editor"
        size="sm"
        pressed={editor.isActive('orderedList')}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrderedIcon className="h-4 w-4" />
      </Toggle>
    </div>
  );
};

export type RichTextEditorProps = {
  className?: string;
  description?: string;
  name?: string;
  editable?: boolean;
  onChange?: (...event: any[]) => void;
};

const RichTextEditor = ({
  className,
  name,
  description,
  editable = true,
  onChange,
}: RichTextEditorProps) => {
  const editor = useEditor({
    editable,
    editorProps: {
      attributes: {
        class: `${cn('max-w-[53.5rem] h-60 w-full rounded-t-[0.375rem] px-3 py-2 border-b-0 ring-offset-background placeholder:text-primary-light focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 overflow-auto', editable ? 'border border-primary-super-light bg-white' : 'bg-inherit', className)}`,
      },
    },
    extensions: [
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal pl-4',
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc pl-4',
          },
        },
      }),
      Placeholder.configure({
        placeholder: '請輸入活動說明',
        emptyEditorClass:
          'before:text-primary-light  before:content-[attr(data-placeholder)] before:float-left before:h-0',
      }),
    ],
    onUpdate({ editor: updatedEditor }) {
      if (onChange !== undefined) {
        onChange(JSON.stringify(updatedEditor.getJSON()));
      }
    },
  });

  useEffect(() => {
    if (description && editor && !editable) {
      editor.commands.setContent({
        type: 'doc',
        content: [JSON.parse(description)],
      });
    }
  }, [description, editor, editable]);

  return (
    <div>
      <EditorContent editor={editor} />
      {editable && editor ? <RichTextEditorToolbar editor={editor} /> : null}
      <input name={name} type="hidden" readOnly value={description} />
    </div>
  );
};

export default RichTextEditor;
