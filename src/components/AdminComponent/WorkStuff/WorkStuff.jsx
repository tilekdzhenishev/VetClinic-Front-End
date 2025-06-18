import React, { useState, useEffect } from 'react';

const WorkStaff = ({ onSave }) => {
  const [functionType, setFunctionType] = useState('view');
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('doctor');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const styles = {
    header: {
      marginBottom: '30px'
    },
    pageTitle: {
      fontSize: '2em',
      fontWeight: 'bold',
      color: 'var(--text-primary, #333)',
      marginBottom: '5px',
      transition: 'color 0.3s ease'
    },
    subtitle: {
      fontSize: '0.9em',
      color: 'var(--text-secondary, #666)',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      transition: 'color 0.3s ease'
    },
    formContainer: {
      backgroundColor: 'var(--bg-secondary, #f8f9fa)',
      padding: '30px',
      borderRadius: '16px',
      boxShadow: '0 2px 8px var(--box-shadow-light, rgba(0,0,0,0.1))',
      display: 'flex',
      flexDirection: 'column',
      transition: 'background-color 0.3s ease, box-shadow 0.3s ease'
    },
    formGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      fontSize: '0.9em',
      color: 'var(--text-secondary, #666)',
      marginBottom: '8px',
      fontWeight: '500',
      transition: 'color 0.3s ease'
    },
    inputWrapper: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      border: '1px solid var(--border-color, #ddd)',
      borderRadius: '8px',
      overflow: 'hidden',
      transition: 'border-color 0.3s ease'
    },
    input: {
      flex: 1,
      padding: '12px 15px',
      border: 'none',
      outline: 'none',
      fontSize: '1em',
      color: 'var(--text-primary, #333)',
      backgroundColor: 'transparent',
      transition: 'color 0.3s ease'
    },
    select: {
      flex: 1,
      padding: '12px 15px',
      border: 'none',
      outline: 'none',
      fontSize: '1em',
      color: 'var(--text-primary, #333)',
      backgroundColor: 'transparent',
      appearance: 'none',
      backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 15px center',
      backgroundSize: '16px',
      transition: 'color 0.3s ease'
    },
    iconButton: {
      background: 'none',
      border: 'none',
      padding: '0 15px',
      cursor: 'pointer',
      color: 'var(--text-secondary, #666)',
      fontSize: '1.2em',
      transition: 'color 0.3s ease'
    },
    saveButton: {
      backgroundColor: 'var(--accent-blue, #007bff)',
      color: 'white',
      padding: '12px 30px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1.1em',
      fontWeight: '600',
      marginTop: '20px',
      alignSelf: 'flex-end',
      transition: 'background-color 0.2s ease'
    },
    employeeList: {
      maxHeight: '300px',
      overflowY: 'auto',
      border: '1px solid var(--border-color, #ddd)',
      borderRadius: '8px',
      backgroundColor: 'white'
    },
    employeeItem: {
      padding: '12px 15px',
      borderBottom: '1px solid #eee',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'background-color 0.2s ease'
    },
    employeeInfo: {
      flex: 1
    },
    employeeName: {
      fontWeight: '600',
      marginBottom: '4px'
    },
    employeeDetails: {
      fontSize: '0.85em',
      color: 'var(--text-secondary, #666)'
    },
    roleSelect: {
      padding: '4px 8px',
      fontSize: '0.85em',
      border: '1px solid #ddd',
      borderRadius: '4px'
    },
    message: {
      padding: '10px',
      borderRadius: '4px',
      marginBottom: '15px',
      fontSize: '0.9em'
    },
    successMessage: {
      backgroundColor: '#d4edda',
      color: '#155724',
      border: '1px solid #c3e6cb'
    },
    errorMessage: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
      border: '1px solid #f5c6cb'
    }
  };

  useEffect(() => {
    if (functionType === 'view') {
      fetchAllUsers();
    }
  }, [functionType]);

  useEffect(() => {
    filterUsers();
  }, [allUsers, roleFilter]);

  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://vetclinic-back-end.onrender.com/api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setAllUsers(data);
      } else {
        setMessage('Failed to fetch users');
      }
    } catch (error) {
      setMessage('Error fetching users: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    if (roleFilter === 'all') {
      setFilteredUsers(allUsers);
    } else {
      setFilteredUsers(allUsers.filter(user => user.role === roleFilter));
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    setLoading(true);
    try {
      const response = await fetch('https://vetclinic-back-end.onrender.com/api/users/confirm-role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          role: newRole
        })
      });

      if (response.ok) {
        setMessage('Role updated successfully');
        fetchEmployees(); // Refresh the list
      } else {
        setMessage('Failed to update role');
      }
    } catch (error) {
      setMessage('Error updating role: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewEmployee = () => {
    if (!email || !name || !role) {
      setMessage('Please fill in all fields.');
      return;
    }
    
    // Here you would typically make an API call to add a new employee
    console.log({ email, name, role });
    setMessage('Employee added successfully');
    
    // Clear form
    setEmail('');
    setName('');
    setRole('doctor');
    
    if (onSave) onSave();
  };

  return (
    <div>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>Work Staff</h1>
        <p style={styles.subtitle}>MANAGE YOUR EMPLOYEES</p>
      </div>

      {message && (
        <div style={{
          ...styles.message,
          ...(message.includes('success') ? styles.successMessage : styles.errorMessage)
        }}>
          {message}
        </div>
      )}

      <div style={styles.formContainer}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Choose Function</label>
          <div style={styles.inputWrapper}>
            <select
              style={styles.select}
              value={functionType}
              onChange={(e) => setFunctionType(e.target.value)}
            >
              <option value="view">View & Manage Employees</option>
              <option value="add">Add New Employee</option>
            </select>
          </div>
        </div>

        {functionType === 'add' && (
          <>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <div style={styles.inputWrapper}>
                <input
                  type="email"
                  placeholder="Enter employee email"
                  style={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Name</label>
              <div style={styles.inputWrapper}>
                <input
                  type="text"
                  placeholder="Provide full name"
                  style={styles.input}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Role</label>
              <div style={styles.inputWrapper}>
                <select
                  style={styles.select}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="doctor">Doctor</option>
                  <option value="admin">Admin</option>
                  <option value="assistant">Assistant</option>
                </select>
              </div>
            </div>

            <button 
              style={styles.saveButton} 
              onClick={handleAddNewEmployee}
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Employee'}
            </button>
          </>
        )}

        {functionType === 'view' && (
          <>
            <div style={styles.formGroup}>
              <label style={styles.label}>Filter by Role</label>
              <div style={styles.inputWrapper}>
                <select
                  style={styles.select}
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <option value="all">All Users</option>
                  <option value="doctor">Doctors</option>
                  <option value="admin">Admins</option>
                  <option value="assistant">Assistants</option>
                </select>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Users ({filteredUsers.length})</label>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>
              ) : (
                <div style={styles.employeeList}>
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      style={{
                        ...styles.employeeItem,
                        backgroundColor: selectedEmployee?.id === user.id ? '#f0f8ff' : 'white'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = selectedEmployee?.id === user.id ? '#f0f8ff' : 'white'}
                    >
                      <div style={styles.employeeInfo}>
                        <div style={styles.employeeName}>{user.name}</div>
                        <div style={styles.employeeDetails}>
                          {user.email} • {user.role} • {user.verified ? 'Verified' : 'Not Verified'}
                        </div>
                      </div>
                      <select
                        style={styles.roleSelect}
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        disabled={loading}
                      >
                        <option value="doctor">Doctor</option>
                        <option value="admin">Admin</option>
                        <option value="assistant">Assistant</option>
                      </select>
                    </div>
                  ))}
                  {filteredUsers.length === 0 && !loading && (
                    <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                      No users found for selected role
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WorkStaff;