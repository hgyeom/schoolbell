import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([{ name: '', password: '' }]);
  const [nameErrors, setNameErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [isConfirmEnabled, setConfirmEnabled] = useState(false);
  const [formData, setFormData] = useState(null);

  // confirm 활성화를 위해 사용
  useEffect(() => {
    checkConfirm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, nameErrors, passwordErrors]);

  // 폼 추가
  const handleAddUser = () => {
    setUsers([...users, { name: '', password: '' }]);
  };

  // 폼 삭제
  const handleRemoveUser = (index) => {
    const newUsers = [...users];
    newUsers.splice(index, 1);
    setUsers(newUsers);
  };

  // 이름 변경. 에러를 띄워줄 폼을 특정하기 위해 index 사용.
  const handleNameChange = (index, newName) => {
    const newUsers = [...users];
    newUsers[index].name = newName;
    setUsers(newUsers);
    validateName(index, newName);
  };

  // 이름 중복 검사.
  const handleNameBlur = (index, newName) => {
    const nameCheck = (index, name) => {
      // some은 하나라도 true라면 true를 반환한다.
      return users.some((user, i) => i !== index && user.name === name);
    };

    const newErrors = users.map((user, i) => {
      if (i === index && nameCheck(index, newName)) {
        return `The name '${newName}' is duplicated.`;
      }
      if (i !== index && user.name === newName) {
        return `The name '${newName}' is duplicated.`;
      }
      return '';
    });

    setNameErrors(newErrors);
  };

  // 이름 유효성 검사.
  const validateName = (index, newName) => {
    if (newName.length > 1 && newName.length < 4) {
      const newErrors = [...nameErrors];
      newErrors[index] = `Name must be at least 3 characters long.`;
      setNameErrors(newErrors);
    } else {
      const newErrors = [...nameErrors];
      newErrors[index] = '';
      setNameErrors(newErrors);
    }
  };

  // 비밀번호 변경
  const handlePasswordChange = (index, newPassword) => {
    const newUsers = [...users];
    newUsers[index].password = newPassword;
    setUsers(newUsers);
    validatePassword(index, newPassword);
  };

  // 비밀번호 유효성 검사
  const validatePassword = (index, newPassword) => {
    if (newPassword.length !== 0 && newPassword.length < 6) {
      const newErrors = [...passwordErrors];
      newErrors[index] = `Password must be at least 6 characters long.`;
      setPasswordErrors(newErrors);
    } else {
      const newErrors = [...passwordErrors];
      newErrors[index] = '';
      setPasswordErrors(newErrors);
    }
  };

  // 비밀번호 0인지 확인
  const handlePasswordBlur = (index, newPassword) => {
    if (newPassword.length === 0) {
      const newErrors = [...passwordErrors];
      newErrors[index] = `Password is required.`;
      setPasswordErrors(newErrors);
    }
  };

  const checkConfirm = () => {
    // 모든 폼의 name과 password가 입력되어 있고 에러가 없는지 확인
    const isValid = users.every((user, index) => {
      return (
        user.name.trim() !== '' &&
        user.password.trim() !== '' &&
        nameErrors[index] === '' &&
        passwordErrors[index] === ''
      );
    });

    // Confirm 버튼 활성화 여부 설정
    setConfirmEnabled(isValid);
  };

  // Confirm 버튼 클릭 시
  const handleConfirm = () => {
    const formattedData = users.map((user) => ({
      name: user.name,
      password:
        user.password.substring(0, 3) + '*'.repeat(user.password.length - 3),
    }));
    setFormData(formattedData);
    setUsers([{ name: '', password: '' }]);
  };
  return (
    <div className="App">
      {users.map((user, index) => (
        <div className="form" key={index}>
          <div className="topMenu">
            <div>
              <strong>User - {index}</strong>
            </div>
            <div
              className="removeButton"
              onClick={() => handleRemoveUser(index)}
            >
              <strong>x</strong>
            </div>
          </div>
          <div className="inputArea">
            <label>Name</label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => handleNameChange(index, e.target.value)}
              onBlur={(e) => handleNameBlur(index, e.target.value)}
            />
            {nameErrors[index] && (
              <div style={{ color: 'red' }}>{nameErrors[index]}</div>
            )}
            <label style={{ marginTop: '15px' }}>Password</label>
            <input
              type="password"
              value={user.password}
              onChange={(e) => handlePasswordChange(index, e.target.value)}
              onBlur={(e) => handlePasswordBlur(index, e.target.value)}
            />
            {passwordErrors[index] && (
              <div style={{ color: 'red' }}>{passwordErrors[index]}</div>
            )}
          </div>
        </div>
      ))}
      <div className="buttonArea">
        <button className="addButton" onClick={handleAddUser}>
          Add User
        </button>
        <button
          className={`confirmButton ${isConfirmEnabled ? 'active' : ''}`}
          disabled={!isConfirmEnabled}
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </div>
      {formData && (
        <div className="contentArea">
          <ul className="contentList">
            {formData.map((data, index) => (
              <li className="contentItem" key={index}>
                <div>
                  <strong>Name:</strong> {data.name}
                </div>
                <div>
                  <strong>Password:</strong> {data.password}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
