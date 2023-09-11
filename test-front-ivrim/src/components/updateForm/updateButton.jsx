import React, { useState } from 'react';
import styled from 'styled-components';
import { MdAdd, MdSettingsApplications } from 'react-icons/md';
import TaskService from '../../services/taskService';

const FormContainer = styled.div`
  position: relative; /* Position relative to the button */
  display: inline-block; /* Display inline-block to ensure it's below the button */
`;

const Form = styled.form`
  display: ${(props) => (props.showForm ? 'block' : 'none')};
  display: flex;
  flex-direction: column;
  z-index: 100;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const Label = styled.label`
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 16px;
`;

const Select = styled.select`
  padding: 8px;
  margin-bottom: 16px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  min-width: 50%;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;

export default function UpdateButton({ cardUpdated, inicialCard }) {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const [formData, setFormData] = useState(inicialCard);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = await TaskService.updateTask(formData, Number(inicialCard.id));
    cardUpdated()
    setFormData(task);
  };

  return (
    <FormContainer>
      <button onClick={toggleForm}>
        <MdSettingsApplications size={24} color="#FFF" />
      </button>
      {showForm && (
        <Form showForm="showForm" onSubmit={handleSubmit}>
          <Label>Title:</Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Label>Description:</Label>
          <Input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <Label>Status:</Label>
          <Select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            {["aFazer", "fazendo", "feito"].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Select>

          <SubmitButton type="submit">Submit</SubmitButton>
        </Form>
      )}
    </FormContainer>
  );
};
