enum Role {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
}

export default Role;

export function isRole(role: any): role is Role {
  return Object.values(Role).includes(role);
}
