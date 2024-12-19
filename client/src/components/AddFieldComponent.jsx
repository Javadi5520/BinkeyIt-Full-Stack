import { IoClose } from "react-icons/io5";

export default function AddFieldComponent({ close, value, onChange, submit }) {
  return (
    <section className="fixed top-0 bottom-0 right-0 left-0 bg-neutral-900 bg-opacity-70 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded p-4 w-full max-w-md">
        <div className="flex justify-between items-center gap-3">
          <h1 className="font-semibold">Add Field</h1>
          <button onClick={close}>
            <IoClose size={25} />
          </button>
        </div>
        <input value={value} onChange={onChange} className="bg-blue-50 p-2 border outline-none focus-within:border-primary-100 rounded w-full my-3" type="text" placeholder="Enter field name" />
        <button onClick={submit} className="bg-primary-200 px-4 py-2 rounded mx-auto w-fit block hover:bg-primary-100">
          Add Field
        </button>
      </div>
    </section>
  );
}
