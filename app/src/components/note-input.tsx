import { useDebouncedEffect } from "@/utils/use-debounced-effect";
import { AutoComplete, Button, Card, Flex, Popconfirm, Tag } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

export type NoteInputProps = {
  _id: string;
  body: string;
  tags: string[];
  onDelete: (props: NoteInputProps) => void;
  onUpdate: (props: NoteInputProps) => void;
  type: "local" | "remote";
};

export function NoteInput(props: NoteInputProps) {
  const [tags, setTags] = useState<string[]>(props.tags);
  const [body, setBody] = useState<string>(props.body);
  const [tagInput, setTagInput] = useState<string>("");

  useDebouncedEffect(
    () => {
      props.onUpdate?.({ ...props, body, tags });
    },
    [body, tags],
    500
  );

  const saveTagInput = () => {
    setTagInput("");
    if (!tags.includes(tagInput)) setTags([...tags, tagInput]);
  };

  return (
    <Card
      style={{
        flex: 1,
        maxWidth: 400,
        minWidth: 200,
      }}
      title={
        body.substring(0, 20) + (body.length > 20 ? "..." : "") || "New note"
      }
      extra={[
        <Popconfirm
          title="Delete note"
          description="Do you really wish to delete this note?"
          onConfirm={() => props.onDelete?.(props)}
          okText="Yes"
          okType="danger"
          cancelText="No"
          motion={{ motionEnter: true, motionLeave: true }}
          key={0}
        >
          <Button type="text" danger>
            Delete
          </Button>
        </Popconfirm>,
      ]}
      actions={[]}
    >
      <Flex gap={10} vertical flex={1}>
        <TextArea
          placeholder="Type something in..."
          rows={5}
          size="large"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          variant="borderless"
        />
        <Flex wrap="wrap" gap={5}>
          {tags.map((tag) => (
            <Tag
              closable
              onClose={() => setTags((x) => x.filter((t) => t != tag))}
              key={tag}
            >
              {tag}
            </Tag>
          ))}
          <Flex gap={0}>
            <AutoComplete
              style={{ width: 100 }}
              size="small"
              placeholder="Add tags"
              filterOption={(inputValue, option) => {
                if (option?.value) {
                  const matches =
                    option.value
                      .toString()
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1;
                  if (matches) {
                    return true;
                  }
                }
                return false;
              }}
              value={tagInput}
              onChange={(value) => setTagInput(value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  saveTagInput();
                }
              }}
            ></AutoComplete>
            {tagInput && (
              <Button type="link" size="small" onClick={saveTagInput}>
                ok
              </Button>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
