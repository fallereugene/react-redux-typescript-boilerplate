/**
 * Поддерживаемы статус-коды ответов API
 */
enum ResponseStatus {
    // 200 OK («хорошо»)
    s200 = 200,
    // No Content («нет содержимого»)
    s204 = 204,
    // Bad Request («неправильный, некорректный запрос»)
    s400 = 400,
    // Unauthorized («не авторизован (не представился)»)
    s401 = 401,
    // Forbidden («запрещено (не уполномочен)»)
    s403 = 403,
    // Not Found («не найдено»)
    s404 = 404,
    // Unprocessable Entity («необрабатываемый экземпляр»)
    s422 = 422,
    // Too Many Requests («слишком много запросов»)
    s429 = 429,
    // Internal Server Error («внутренняя ошибка сервера»)
    s500 = 500,
}

export default ResponseStatus;
