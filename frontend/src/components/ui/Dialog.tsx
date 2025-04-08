import { AnimatePresence, motion } from "framer-motion"
import { Button } from "./Button"

interface DialogProps {
    isOpen: boolean,
    onClose: () => void,
    children: React.ReactNode
    onAdd: () => void
}


export const Dialog = (props: DialogProps) => {
    return (
      <AnimatePresence>
        {props.isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
              onClick={props.onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
  
            {/* Dialog */}
            <motion.div
              className="fixed top-1/2 left-1/2 z-[60]"
              initial={{ opacity: 0, scale: 0.95, y: "-50%", x: "-50%" }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-white rounded-md h-auto w-[700px] flex flex-col shadow-lg">
                <div className="flex items-center bg-gradient-to-br from-gray-700 to-gray-800 justify-center rounded-t-md h-10">
                  <div className="px-4 mr-auto text-white">
                    <p className="font-bold text-xl">Add New Content</p>
                  </div>
                </div>
  
                <div className="px-4 mt-4">{props.children}</div>
  
                <div className="mt-4 ml-auto mr-4 mb-2 flex gap-2 text-white">
                  <Button
                    variant="secondary"
                    text="Add"
                    size="md"
                    onClick={props.onAdd}
                    hasBackground={true}
                   />

                  <Button
                    variant="secondary"
                    text="Cancel"
                    size="md"
                    onClick={props.onClose}
                    hasBackground={true}
                   />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  };