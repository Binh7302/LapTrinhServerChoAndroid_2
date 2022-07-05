const categoryService = require('./service');

exports.getCategories = async () => {
    const data = await categoryService.getCategories();
    return data;
}

exports.getCategoriesById = async (id) => {
    return await categoryService.getCategoriesById(id);
}

exports.getCategoriesForOneProduct = async (selectedId) => {
    let categories = await categoryService.getCategories();
    categories = categories.map(item => {
        // if(item._id == selectedId){
        //     item = {...item, selected: true};
        // }else{
        //     item = {...item, selected: false};
        // }
        item = {
            _id: item._id,
            name: item.name,
            description: item.description,
            selected: item._id.toString() == selectedId.toString()
        }
        return item;
    })
    return categories;
}