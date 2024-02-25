"use client";

import { PlusCircleFilled } from "@ant-design/icons";
import { Flex, Button, Card } from "antd";
import Title from "antd/es/typography/Title";
import Text, { TextProps } from "antd/es/typography/Text";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Auth } from "@/storage/auth";
import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "@/api/api-client";
import { NoteInput, NoteInputProps } from "@/components/note-input";

export default function Notes() {
  const { data: session, status } = useSession();
  const [notes, setNotes] = useState<NoteInputProps[]>([]);

  const onDelete = useCallback(async (note: NoteInputProps) => {
    if (note.type == "remote") {
      await ApiClient.notesControllerDeleteNote({
        requestBody: {
          _id: note._id,
        },
      });
    }

    setNotes((x) => x.filter((n) => n._id != note._id));
  }, []);

  const onUpdate = useCallback(
    async (note: NoteInputProps) => {
      let replaced: NoteInputProps | null = null;
      if (note.type == "local") {
        const created = await ApiClient.notesControllerCreateNote({
          requestBody: { body: note.body, tags: note.tags },
        });
        replaced = { ...note, _id: created._id, type: "remote" };
      } else {
        const updated = await ApiClient.notesControllerUpdateNote({
          requestBody: {
            body: note.body,
            tags: note.tags,
            _id: note._id,
          },
        });
        replaced = { ...updated, type: "remote", onUpdate, onDelete };
      }

      if (replaced) {
        setNotes((x) => x.map((n) => (n._id == note._id ? replaced! : n)));
      }
    },
    [onDelete]
  );

  const remoteNotes = useQuery({
    queryKey: ["notes"],
    queryFn: async () => await ApiClient.notesControllerGetNotes(),
  });
  useEffect(() => {
    if (remoteNotes.data)
      setNotes(
        remoteNotes.data.map((n) => ({
          ...n,
          type: "remote",
          onUpdate,
          onDelete,
        }))
      );
  }, [remoteNotes.data, onUpdate, onDelete]);

  useEffect(() => {
    if (status == "authenticated") {
      fetch("/api/auth/api-token")
        .then((res) => res.json())
        .then((data) => (Auth.apiToken = data.token));
    }
  }, [status]);

  if (status == "loading")
    return (
      <Flex
        gap={30}
        flex={1}
        wrap="wrap"
        justify="stretch"
        align="stretch"
        style={{ justifyContent: "center", width: "100%" }}
      >
        <Card style={{ width: 300, height: 200 }} loading />
        <Card style={{ width: 300, height: 200 }} loading />
        <Card style={{ width: 300, height: 200 }} loading />
      </Flex>
    );

  if (status == "unauthenticated") {
    return (
      <Flex vertical={true} align="center" gap={20}>
        <Title>You must be signed in to acces your notes.</Title>
        <Link href="/signin">
          <Button type="primary" size="large">
            Take me there
          </Button>
        </Link>
      </Flex>
    );
  }

  return (
    <Flex vertical={true} align="center" gap={50}>
      {notes.length == 0 && (
        <Title>
          Hi {session?.user?.name?.split(" ")?.[0]}, let&apos;s create your
          first note.
        </Title>
      )}
      <NoteAdd
        onClick={() =>
          setNotes((x) => [
            ...x,
            {
              body: "",
              tags: [],
              onUpdate,
              onDelete,
              _id: Math.random().toString(36).substring(7),
              type: "local",
            },
          ])
        }
      />
      <Flex
        gap={30}
        flex={1}
        wrap="wrap"
        justify="stretch"
        align="stretch"
        style={{ justifyContent: "center", width: "100%" }}
      >
        {notes.map((note) => (
          <NoteInput key={note._id} {...note} />
        ))}
      </Flex>
    </Flex>
  );
}

function NoteAdd(props: TextProps) {
  return (
    <Text style={{ cursor: "pointer" }} {...props}>
      <PlusCircleFilled style={{ fontSize: 60 }} />
    </Text>
  );
}
