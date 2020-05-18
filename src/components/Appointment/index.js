import React from "react";
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";
import Confirm from "components/Appointment/Confirm";
import "./styles.scss";
import useVisualMode from 'hooks/useVisualMode';

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const SAVE = "SAVE";
  const DELETE = "DELETE";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = 'ERROR_DELETE'

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
  const { bookInterview } = props;
  
  const save = function (name, interviewer) {
    const interview = { student: name, interviewer };
    return interview;
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === SHOW && (
        <Show
          id={props.id}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={(name, interviewer) => {
            transition(SAVE)
            bookInterview(props.id, save(name, interviewer))
              .then(() => transition(SHOW))
              .catch(() => { transition(ERROR_SAVE, true) })
            }        
          }
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          onCancel={() => back()}
          onConfirm={() => {
            transition(DELETE, true);
            props.deleteInterview(props.id)
              .then(() => {
                transition(EMPTY)
              })
              .catch(() => {
                transition(ERROR_DELETE, true);
              })
          }}
          message="Are you sure you want to delete this appointment?"
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={(name, interviewer) => {
            transition(SAVE)
            bookInterview(props.id, save(name, interviewer))
              .then(() => transition(SHOW))
              .catch(() => { transition(ERROR_SAVE, true) })
          }}
        />
      )}
       {mode === DELETE && (<Status message="Deleting" />)}
       {mode === SAVE && (<Status message="Saving" />)}
       {mode === ERROR_DELETE && (<Error message="Could not delete appointment." onClose={() => back()} />)}
      {mode === ERROR_SAVE && (<Error message="Could not save appointment." onClose={() => back()} />)}
    </article>
  );
}
