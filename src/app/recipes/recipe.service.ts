import { Recipe } from './recipe.model';

export class RecipeService{
    private recipes: Recipe[] = [
        new Recipe('A Test Recipe', 'This is simply a test', 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2019/8/6/0/WU2301_Four-Cheese-Pepperoni-Pizzadilla_s4x3.jpg.rend.hgtvcom.826.620.suffix/1565115622965.jpeg'),
        new Recipe('Another Test Recipe', 'This is simply a test', 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2019/8/6/0/WU2301_Four-Cheese-Pepperoni-Pizzadilla_s4x3.jpg.rend.hgtvcom.826.620.suffix/1565115622965.jpeg')
      ];

      getRecipes(){
        return this.recipes.slice();
      }
}