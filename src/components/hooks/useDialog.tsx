import React, {useCallback, useRef, useState, useMemo} from "react";

export default function useDialog(Dialog: any): [React.ReactNode, (props?: any) => Promise<any>] {
    const [props, setProps] = useState<any>({})
    const [showModal, setShowModal] = useState(false)
    const resolveRef = useRef<any>(null)

    const open = useCallback((props: any) => {
        setShowModal(true)
        setProps(props)

        return new Promise((resolve) => {
            resolveRef.current = resolve
        })
    }, [])

    const handleSubmit = useCallback((...params: any[]) => {
        setShowModal(false)
        resolveRef.current(params)
    }, [])

    const handleClose = useCallback(() => {
        setShowModal(false)
        resolveRef.current(null)
    }, [])

    const dialog = useMemo(() => {
        return showModal ? <Dialog {...props} open={true} onSubmit={handleSubmit} onClose={handleClose} /> : null
    }, [Dialog, showModal, props])

    return [dialog, open]
}