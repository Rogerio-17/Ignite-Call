import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
  TextInput,
} from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container, Header } from "../styles";
import { FormAnnotation, ProfileBox } from "./styles";
import { useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { buildNextAuthOptions } from "../../api/auth/[...nextauth].api";
import { api } from "../../../lib/axios";
import Router from "next/router";

const UpdateProfileSchema = z.object({
  bio: z.string(),
});

type UpdateProfileData = z.infer<typeof UpdateProfileSchema>;

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(UpdateProfileSchema),
  });

  const session = useSession();

  async function handleUpdateProfile(data: UpdateProfileData) {
    await api.put('/users/profile', {
      bio: data.bio
    })

    await Router.push(`/schedule/${session.data?.user.username}`)
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={4} />
      </Header>

      <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
        <label>
          <Text size="sm"> Foto de perfil </Text>
          <Avatar src={session.data?.user.avatar_url} alt={session.data?.user.name}/>
        </label>

        <label>
          <Text size="sm">Sobre você</Text>
          <TextArea placeholder="Seu nome" {...register("bio")} />
          <FormAnnotation size="sm">
            Fale um pouco sobre você. Isto será exibido em sua página pessoal.
          </FormAnnotation>
        </label>

        <Button disabled={isSubmitting}>
          Finalizar
          <ArrowRight />
        </Button>
      </ProfileBox>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res)
  );

  return {
    props: {
      session,
    },
  };
};
