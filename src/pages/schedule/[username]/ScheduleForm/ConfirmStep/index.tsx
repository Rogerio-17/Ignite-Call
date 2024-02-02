import { Button, Text, TextArea, TextInput } from "@ignite-ui/react";
import { ConfirmForm, FormActions, FormHeader } from "./style";
import { CalendarBlank, Clock } from "phosphor-react";

export function ConfirmStep() {
    function handleConfirmScheuling() {

    }

    return (
        <ConfirmForm as="form" onSubmit={handleConfirmScheuling}>
            <FormHeader>
            <Text>
                <CalendarBlank/>
                22 de Setembro de 2022
            </Text>
            <Text>
                <Clock />
                18:00
            </Text>
            </FormHeader>

            <label>
                <Text size="sm">Nome completo</Text>
                <TextInput placeholder="Seu nome"></TextInput>
            </label>
            <label>
                <Text size="sm">Endereço de e-mail</Text>
                <TextInput type="email" placeholder="ignitecall@example.com"></TextInput>
            </label>
            <label>
                <Text size="sm">Observações</Text>
                <TextArea></TextArea>
            </label>

            <FormActions>
                <Button type="button" variant="tertiary">Cancelar</Button>
                <Button type="submit">Confirmar</Button>
            </FormActions>
        </ConfirmForm>
    )
}