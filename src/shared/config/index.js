//TODO: В идеале обращение к api должно происходить через отдельные ассинхронные функции, которые будут добавлены в этот (или другой отдельный) файл, которые будут из него экспортироваться. Тогда не нужно будет большое количество урлов, пригодится один базовый serverUrl.
// ты имеешь ввиду репозиторий я понял.
export const serverUrl = "http://127.0.0.1:8000";
export const apiUrl = `${serverUrl}/api/`;
export const quizApiUrl = `${serverUrl}/api-quiz/`;
export const typesApiUrl = `${serverUrl}/api-types/`;
export const teacherApiUrl = `${serverUrl}/api/teacher/`;
export const teacherLoginApiUrl = `${serverUrl}/api/teacher-login`;
