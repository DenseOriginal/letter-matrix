import { createContext, HTMLProps, PropsWithChildren, useCallback, useContext, useMemo, useRef } from "react";
import "./Dialog.scss";
import { classNames } from "../helpers/helpers";

interface IDialogContext {
	id: string;
}

const DialogContext = createContext<IDialogContext | undefined>(undefined);
const useDialogContext = () => {
	const context = useContext(DialogContext);

	if (!context) {
		throw new Error("DialogContext can only be used in the dialog component");
	}

	return context;
}

interface DialogProps extends HTMLProps<HTMLDialogElement> {
	id: string;
}

export function Dialog(props: DialogProps) {
	const ref = useRef<HTMLDialogElement | null>();
	const context = useMemo(() => ({ id: props.id }), [props.id]);

	return (
		<dialog
			{...props}
			ref={dialog => ref.current = dialog}
			className={classNames(
				"absolute",
				"bg-white w-[80vw] rounded-sm",
				props.className
			)}
		>
			<DialogContext.Provider value={context}>
				{props.children}
			</DialogContext.Provider>

		</dialog>
	)
}

Dialog.Close = () => {
	const context = useDialogContext();
	const onClose = useCallback(() => {
		const dialog = document.getElementById(context.id) as HTMLDialogElement;
		dialog?.close();
	}, [context.id]);

	return (
		<button
			autoFocus
			onClick={onClose}
			className="top-2 right-2 absolute w-6"
		>
			X
		</button>
	)
}

Dialog.Content = (props: PropsWithChildren<{}>) => (
	<div className="p-4">{props.children}</div>
)

Dialog.Button = (props: HTMLProps<HTMLButtonElement> & { dialog: string }) => {
	const onClick = useCallback(() => {
		const dialog = document.getElementById(props.dialog) as HTMLDialogElement | null;
		dialog?.showModal();
	}, [props.dialog]);

	return (
		<button {...props} type="button" onClick={onClick}>

		</button>
	)
}