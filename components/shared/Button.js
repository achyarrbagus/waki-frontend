export default function ButtonComp({ caption }) {
  return (
    <div className="max-w-screen-md fixed flex flex-col bottom-0 left-0 right-0 bg-white items-center justify-center mx-auto border-t border-gray-150 z-30 py-2 px-3">
      <button
        type="button"
        className="bg-secondary-600 text-white font-bold block w-full text-center text-lg p-4 rounded-full"
      >
        {caption}
      </button>
    </div>
  );
}
