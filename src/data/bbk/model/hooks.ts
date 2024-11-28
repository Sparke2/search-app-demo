import {useLocation, useNavigate} from "react-router-dom";
import {getAllBkkOptions, useAllBbk} from "./queries";
import {TreeChecked} from "../../../global";
import {TreeNode} from "./types";
import {useQuery} from "@tanstack/react-query";

export const isPartialCheckedBbkKey = (key: string) => key.startsWith('-');

export const useBbk = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { data: { data: NodesBBK = [] } = {} } = useAllBbk();
    const searchParams = new URLSearchParams(location.search);
    const bbkRouter = (searchParams.get('bbk')?.split(',') || []).sort((a, b) => +a[0] - +b[0]);

    const bkkSelectedKeys = bbkRouter.reduce<Record<string, TreeChecked>>((acc, bbk) => {
        const isPartial = isPartialCheckedBbkKey(bbk);
        const cleanKey = isPartial ? bbk.slice(1) : bbk;
        acc[cleanKey] = {
            checked: !isPartial,
            partialChecked: isPartial,
        };
        return acc;
    }, {});

    const apply = (nodes: Record<string, TreeChecked>) => {
        const selectedKeys = Object.entries(nodes)
            .filter(([, value]) => value.checked || value.partialChecked)
            .map(([key, value]) => (value.partialChecked ? `-${key}` : key));
        searchParams.set('bbk', selectedKeys.join(','));
        navigate({ search: searchParams.toString() });
    };

    const filterNodesBbkByKeys = (keys: Record<string, TreeChecked>): TreeNode[] => {
        const deepCloneTree = (tree: TreeNode[]): TreeNode[] =>
            JSON.parse(JSON.stringify(tree)) as TreeNode[];

        const filteredTree = (node: TreeNode): TreeNode | null => {
            const currentKey = keys[node.key];
            if (!currentKey || (!currentKey.checked && !currentKey.partialChecked)) return null;

            if (currentKey.checked && !currentKey.partialChecked) {
                node.children = [];
            } else if (node.children?.length) {
                node.children = node.children
                    .map(filteredTree)
                    .filter((child) => child !== null);
            }
            return node;
        };

        return deepCloneTree(NodesBBK).map(filteredTree).filter(Boolean) as TreeNode[];
    };

    // const traverseTree = (nodes: TreeNode[], callback: (node: TreeNode) => void): void => {
    //     const traverse = (node: TreeNode) => {
    //         if (!node) return;
    //
    //         // Выполняем действие над текущим узлом
    //         callback(node);
    //
    //         // Рекурсивно обходим детей, если они есть
    //         if (node.children?.length) {
    //             node.children.forEach(traverse);
    //         }
    //     };
    //
    //     nodes.forEach(traverse);
    // };
    //
    // const remove = (key: string) => {
    //     if (!bkkSelectedKeys[key]) {
    //         console.log(`Ключ ${key} не найден в bkkSelectedKeys`);
    //         return;
    //     }
    //     console.log(`Начинаем удаление ключа: ${key}`);
    //
    //     // Объект для хранения удалённых ключей
    //     const deletedKeys: Record<string, boolean> = {};
    //
    //     // Рекурсивная функция для удаления узлов
    //     const removeWithTraverse = (keyToRemove: string, keys: Record<string, TreeChecked>): Record<string, TreeChecked> => {
    //         const updatedKeys = { ...keys };
    //
    //         // // Проверяем, был ли этот ключ уже удалён с помощью 'key in deletedKeys'
    //         // if (keyToRemove in deletedKeys) { // Используем 'key in object' для проверки наличия ключа
    //         //     console.log(`Ключ ${keyToRemove} уже был удалён. Пропускаем.`);
    //         //     return updatedKeys;
    //         // }
    //         //
    //         // // Если ключ пустой, удаляем его, так как это главный родительский ключ
    //         // if (keyToRemove === "") {
    //         //     console.log("Удаляем главный родительский ключ: ''");
    //         //     delete updatedKeys[keyToRemove];
    //         //     deletedKeys[keyToRemove] = true; // Запоминаем, что ключ удалён
    //         //     return updatedKeys;
    //         // }
    //         //
    //         // // Убедимся, что мы не удаляем пустой ключ
    //         // if (!keyToRemove) {
    //         //     console.log("Попытка удалить пустой ключ");
    //         //     return updatedKeys;
    //         // }
    //
    //         // Удаляем ключ, если он существует
    //         if (updatedKeys[keyToRemove]) {
    //             delete updatedKeys[keyToRemove];
    //             deletedKeys[keyToRemove] = true; // Запоминаем, что ключ удалён
    //             console.log(`Удалили ключ: ${keyToRemove}. Текущие ключи:`, updatedKeys);
    //         }
    //
    //         let parentKey: string | null = null;
    //
    //         if (keyToRemove.includes('.')) {
    //             parentKey = keyToRemove.split('.').slice(0, -1).join('.');
    //         }
    //
    //         if (parentKey) {
    //             console.log(`Проверяем родительский ключ: ${parentKey}`);
    //             const hasChildren = traverseTree(NodesBBK, (node) => {
    //                 const childKey = node.key;
    //                 return childKey.startsWith(`${parentKey}.`) && !!updatedKeys[childKey];
    //             });
    //
    //             if (!hasChildren) {
    //                 console.log(`У родительского ключа ${parentKey} больше нет потомков. Удаляем его.`);
    //                 return removeWithTraverse(parentKey, updatedKeys);
    //             }
    //         } else {
    //             console.log(`Ключ ${keyToRemove} не имеет родителя.`);
    //         }
    //
    //         return updatedKeys;
    //     };
    //
    //     let updatedKeys = removeWithTraverse(key, bkkSelectedKeys);
    //
    //     // // Удаляем все ключи из updatedKeys, которые уже есть в deletedKeys
    //     //
    //     let allKeysDeleted = false;
    //     while (!allKeysDeleted) {
    //         const beforeKeys = Object.keys(updatedKeys).length;
    //
    //         // Удаляем все пустые ключи и обновляем рекурсивно
    //         updatedKeys = Object.keys(updatedKeys).reduce((acc, currentKey) => {
    //             if (currentKey && !(currentKey in deletedKeys)) { // Проверяем, что ключ ещё не удалён
    //                 const updated = removeWithTraverse(currentKey, updatedKeys);
    //                 return { ...acc, ...updated };
    //             }
    //             return acc;
    //         }, {});
    //
    //         const afterKeys = Object.keys(updatedKeys).length;
    //         allKeysDeleted = beforeKeys === afterKeys; // Прекращаем, если ключи больше не изменяются
    //     }
    //
    //     updatedKeys = Object.keys(updatedKeys).reduce((acc, currentKey) => {
    //         console.log({deletedKeys})
    //         console.log({currentKey})
    //         console.log(currentKey in deletedKeys)
    //         if (!(currentKey in deletedKeys)) { // Проверяем, если ключ не был удалён
    //             acc[currentKey] = updatedKeys[currentKey];
    //         }
    //         return acc;
    //     }, {});
    //
    //     console.log(`Финальный список ключей после удаления ${key}:`, updatedKeys);
    //     apply(updatedKeys);
    // };

    // const selected = useQueryParam('bbk'); // Строка с выбранными ключами
    //
    // const remove = (key: string) => {
    //     console.log(`Начинаем удаление для ключа: ${key}`);
    //
    //     // Функция для удаления узла и его детей
    //     const removeNodeAndChildren = (nodes: TreeNode[], keyToRemove: string): TreeNode[] => {
    //         return nodes.reduce((result: TreeNode[], node: TreeNode) => {
    //             // Если узел или его дети соответствуют ключу для удаления, пропускаем его
    //             if (node.key === keyToRemove || node.key.startsWith(`${keyToRemove}.`)) {
    //                 console.log(`Удаляем узел с ключом: ${node.key}`);
    //                 return result; // Узел не добавляется в итоговый массив
    //             }
    //
    //             // Если у узла есть дети, рекурсивно обрабатываем их
    //             if (node.children?.length) {
    //                 console.log(`Обрабатываем дочерние узлы для: ${node.key}`);
    //                 node.children = removeNodeAndChildren(node.children, keyToRemove);
    //             }
    //
    //             // Добавляем узел в итоговый массив, если он не был удален
    //             result.push(node);
    //             return result;
    //         }, []);
    //     };
    //
    //     // Обработаем дерево, чтобы удалить узел
    //     let updatedNodes = removeNodeAndChildren(NodesBBK, key);
    //
    //     console.log(`Обновлённое дерево после удаления ключа ${key}:`, updatedNodes);
    //
    //     // Функция для проверки, имеет ли родитель узел других выбранных детей
    //     const doesParentHaveOtherSelectedChildren = (parentKey: string, selected: string): boolean => {
    //         const selectedKeys = selected.split(','); // Преобразуем строку в массив
    //         console.log({selectedKeys})
    //         return selectedKeys.some(selectedKey => selectedKey.startsWith(parentKey) && selectedKey !== parentKey);
    //     };
    //
    //     // Функция для удаления родителя, если у него нет других выбранных детей
    //     const removeEmptyParents = (nodes: TreeNode[], selected: string): TreeNode[] => {
    //         const removeParent = (parentKey: string, nodes: TreeNode[]): TreeNode[] => {
    //             // Если родитель не имеет других выбранных детей, удаляем его
    //             if (!doesParentHaveOtherSelectedChildren(parentKey, selected)) {
    //                 console.log(`Родительский узел ${parentKey} не имеет других выбранных детей, удаляем его`);
    //                 return removeNodeAndChildren(nodes, parentKey); // Удаляем родителя, если у него нет других выбранных детей
    //             }
    //             return nodes;
    //         };
    //
    //         // Проверяем каждого родителя в дереве
    //         return nodes.reduce((result: TreeNode[], node: TreeNode) => {
    //             if (node.children) {
    //                 // Рекурсивно проверяем детей
    //                 node.children = removeEmptyParents(node.children, selected);
    //             }
    //
    //             // Удаляем родительский узел, если это безопасно
    //             if (node.children && node.children.length === 0) {
    //                 result = removeParent(node.key, result);
    //             } else {
    //                 result.push(node);
    //             }
    //             return result;
    //         }, []);
    //     };
    //
    //     // Обрабатываем дерево, чтобы удалить пустые родительские узлы
    //     updatedNodes = removeEmptyParents(updatedNodes, selected);
    //
    //     console.log(`Финальный список после удаления ${key}:`, updatedNodes);
    //
    //     // Применяем обновленные данные
    //     apply(updatedNodes);
    //     console.log(`Удаление завершено.`);
    // };

    const remove = (key: string) => {
        apply([]);
    }

    return { apply, bkkSelectedKeys, filterNodesBbkByKeys, remove };
};

export const useBkkCurrent4Query = () => {
    const { bkkSelectedKeys } = useBbk();
    const { data: meta = {}, isPending } = useQuery({
        ...getAllBkkOptions(),
        select: (v) => v.meta,
    });

    const bbks = Object.entries(bkkSelectedKeys)
        .filter(([, value]) => value.checked || value.partialChecked)
        .map(([key]) => meta?.[key])
        .filter(Boolean) as string[];

    return { bbks, isLoading: isPending };
};
