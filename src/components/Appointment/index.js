import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const { id, time, interview, interviewers } = props;

  // Mode Constants & customHook
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  // Default to SHOW if interview is booked, otherwise empty.
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY)

  // Function to run onSave
  function save(name, interviewer) {

    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props
      .bookInterview(id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((error) => {
        transition(ERROR_SAVE, true);
      });
  };

  const onDelete = () => {
    transition(DELETING, true);
    props
      .cancelInterview(id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => {
        transition(ERROR_DELETE, true);
      });
  };

  const onEdit = (name, interviewer) => {
    transition(EDIT);
  };

  console.log(mode)

  return (
    <article className='appointment'>
    <Header time={time} />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={interview.student}
        interviewer={interview.interviewer}
        onDelete={() => transition(CONFIRM)}
        onEdit={onEdit}
      />
    )}
    {mode === CREATE && (
      <Form interviewers={interviewers} onSave={save} onCancel={back} />
    )}
    {mode === EDIT && (
      <Form
        interviewers={interviewers}
        interviewer={interview.interviewer.id}
        name={interview.student}
        onCancel={() => transition(SHOW)}
        onSave={save}
      />
    )}
    {mode === SAVING && <Status message='Saving...' />}
    {mode === CONFIRM && (
      <Confirm
        onCancel={back}
        onConfirm={() => onDelete()}
        message='Are you sure you want to do this?'
      />
    )}
    {mode === DELETING && <Status message='Deleting...' />}
    {mode === ERROR_DELETE && (
      <Error message='Could not cancel appointment' onClose={back} />
    )}
    {mode === ERROR_SAVE && (
      <Error message='Could not save appointment' onClose={back} />
    )}
  </article>
);
}