import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { Children, cloneElement } from "react"

import TextInput from "../TextInput"

function Form({ schema = yup.object().shape({}), defaultValues = {}, formProps = {}, onSubmit, children }) {
    const config = {
        resolver: yupResolver(schema),
        defaultValues,
        ...formProps,
    }
    const formControl = useForm(config)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm(formControl)
    const allowedComponents = [TextInput]
    const inputs = Children.toArray(children).map((child) => {
        if (!allowedComponents.includes(child.type)) return child
        return cloneElement(child, {
            register: register(child.props.name),
            message: errors[child.props.name]?.message,
        })
    })
    return (
        <form
            onSubmit={handleSubmit((data) => {
                onSubmit(data)
                if (!config.loginForm) reset()
            })}
        >
            {inputs}
        </form>
    )
}

export default Form
