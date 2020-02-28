import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  
  @ViewChild('f', {static:false}) slForm: NgForm;

  
  private subscription: Subscription;
  constructor(private shoppingListService : ShoppingListService) { }
  editMode = false;
  editedIndexItem : number;
  editedItem: Ingredient;

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing
        .subscribe(
          (index: number) => {
            this.editedIndexItem= index;
              this.editMode=true;
              this.editedItem= this.shoppingListService.getIngredient(index);
              this.slForm.setValue({
                name: this.editedItem.name,
                amount: this.editedItem.amount
              })
            }
        );
      }     

  onSubmit(form: NgForm){
      const value = form.value;
      const newIngredient = new Ingredient(value.name, value.amount);
      if(this.editMode){
        this.shoppingListService.updateIngredient(this.editedIndexItem, newIngredient);
      }else{
        this.shoppingListService.addIngredient(newIngredient);
      }
      this.editMode = false;  // This edit mode needs to be changed to false as we need to get 
      //the opton to add new items after the edit mode is complete
      form.reset();
    }

    onClear(){
      this.slForm.reset();
      this.editMode = false;
    }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

    onDelete(){
      this.shoppingListService.deleteIngredient(this.editedIndexItem);
      this.onClear();
    }

}
