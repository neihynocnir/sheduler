import React from "react";
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import "./styles.scss";
import useVisualMode from 'hooks/useVisualMode';

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVE = "SAVE";
  const ERROR_SAVE = "ERROR_SAVE";


  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
  const {bookInterview } = props;

  const save = function (name, interviewer) {
    const interview = { student: name, interviewer };
    return interview;
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          id={props.id}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
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
      )},
       {mode === SAVE && (<Status message="Saving" />)}
    </article>
  );
}