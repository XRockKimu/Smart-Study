import { useState } from "react";


export default function SubTasksAccordian({ subTasks, setSubTasks }) {
  const [activeIndex, setActiveIndex] = useState(null); // Tracks open accordion

  return (
    <div>
      <div className="accordion">
        {subTasks.length > 0 ? (
          subTasks.map((subTask, index) => (
            <div className="accordion-item" key={index}>
              <div
                className="accordion-title"
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
              >
                <div>{subTask.subtask || `Subtask ${index + 1}`}</div>
                <div>{activeIndex === index ? "-" : "+"}</div>
              </div>
              {activeIndex === index && (
                <div className="accordion-content">
                  {subTask.desc || "No description"}
                </div>
              )}
            </div>
          ))
        ) : (
          <div>No subtasks available</div>
        )}
      </div>
    </div>
  );
}