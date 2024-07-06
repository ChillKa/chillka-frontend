'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { Separator } from '@components/ui/separator';
import { Toggle } from '@components/ui/toggle';
import { P } from '@components/ui/typography';
import cn from '@lib/utils';
import Emoji, { gitHubEmojis } from '@tiptap-pro/extension-emoji';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  BoldIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  SmileIcon,
  StrikethroughIcon,
} from 'lucide-react';
import {
  AwaitedReactNode,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
} from 'react';

const RichTextEditorToolbar = ({ editor }: { editor: Editor }) => {
  const emojiArray = editor.storage.emoji.emojis;
  const emojiMap = new Map();
  const emojiGroupKeys = [];
  for (let i = 0; i < emojiArray.length; i += 1) {
    const emoji = emojiArray[i];
    const group = emojiMap.get(emoji.group);
    if (group) {
      emojiMap.set(emoji.group, [...group, emoji]);
    } else {
      emojiGroupKeys.push(emoji.group);
      emojiMap.set(emoji.group, [emoji]);
    }
  }

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
      <Popover modal={false}>
        <PopoverTrigger asChild>
          <Toggle variant="editor" size="sm" className="">
            <SmileIcon className="size-4" />
          </Toggle>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          align="start"
          className="flex max-h-64 max-w-[21rem] flex-wrap overflow-y-scroll rounded-[0.375rem] border-primary-super-light px-3"
        >
          {emojiGroupKeys.map((key: string) => {
            const emojiArr = emojiMap.get(key);
            return (
              <div key={key}>
                <P className="text-primary">{key}</P>
                {emojiArr.map(
                  (emoji: {
                    name: Key;
                    emoji:
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactElement<any, string | JSXElementConstructor<any>>
                      | Iterable<ReactNode>
                      | ReactPortal
                      | Promise<AwaitedReactNode>
                      | null
                      | undefined;
                    fallbackImage: any;
                  }) => {
                    return (
                      <button
                        className="p-2.5"
                        type="button"
                        key={emoji.name}
                        onClick={() =>
                          editor
                            .chain()
                            .focus()
                            .setEmoji(emoji.name?.toString())
                            .run()
                        }
                      >
                        <div className="scale-150 leading-none">
                          {emoji.emoji}
                        </div>
                      </button>
                    );
                  }
                )}
              </div>
            );
          })}
        </PopoverContent>
      </Popover>
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
        class: `${cn('rounded-t-[0.375rem] px-3 py-2 border-b-0 ring-offset-background placeholder:text-primary-light focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 overflow-auto', editable ? 'border border-primary-super-light bg-white' : 'bg-inherit', className)}`,
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
      Emoji.configure({
        emojis: gitHubEmojis,
        enableEmoticons: true,
      }),
      //   suggestion,
      // } as SuggestionOptions),
    ],
    onUpdate({ editor: updatedEditor }) {
      if (onChange !== undefined) {
        onChange(JSON.stringify(updatedEditor.getJSON()));
      }
    },
  });

  useEffect(() => {
    if (description && editor && !editable) {
      let editorContent: any;
      try {
        editorContent = {
          type: 'doc',
          content: [JSON.parse(description)],
        };
      } catch (e) {
        editorContent = description;
      }
      editor.commands.setContent(editorContent);
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
