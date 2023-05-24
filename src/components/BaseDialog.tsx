import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";

interface BasePopupProps {
    open: boolean
    title: string
    children: React.ReactNode
    onClose: () => void
    onSubmit: () => void
    submitDisabled?: boolean
}

export default function BaseDialog(props: BasePopupProps) {
    return <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle data-testid="popup-title">{props.title}</DialogTitle>
        <DialogContent sx={{display: 'flex', overflow: 'visible'}} >
            {props.children}
        </DialogContent>
        <DialogActions>
            <Button data-testid="popup-close" onClick={props.onClose}>Close</Button>
            <Button
                data-testid="popup-submit"
                variant="contained"
                disabled={props.submitDisabled}
                onClick={props.onSubmit}>
                Submit
            </Button>
        </DialogActions>
    </Dialog>
}