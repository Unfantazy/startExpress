import {SortDirection} from "mongodb";

export const getPaginatedResults = async <T>(
    collection: any, // MongoDB коллекция
    filter: object, // Фильтр для поиска
    pageNumber: number, // Номер страницы
    pageSize: number, // Размер страницы
    sortBy: string, // Поле для сортировки
    sortDirection: SortDirection, // Направление сортировки
    mapToOutput: (item: T) => any // Функция для маппинга
) => {
    const totalCount = await collection.countDocuments(filter);

    const items = (await collection
        .find(filter)
        .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
        .skip((+pageNumber - 1) * +pageSize)
        .limit(+pageSize)
        .toArray()) as T[];

    return {
        pagesCount: Math.ceil(totalCount / pageSize),
        page: pageNumber,
        pageSize: pageSize,
        totalCount,
        items: items.map(mapToOutput),
    };
}
