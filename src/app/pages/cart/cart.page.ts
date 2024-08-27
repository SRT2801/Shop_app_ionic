import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ToastController, NavController, LoadingController } from '@ionic/angular';
import { Result } from 'src/app/interfaces/iE-commer';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartItems: Result[] = [];
  totalAmount: number = 0;

  constructor(
    private cartService: CartService,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  // Cargar los productos del carrito y calcular el total
  loadCart() {
    this.cartItems = this.cartService.getCart();
    this.calculateTotal();
  }

  // Calcular el total de los precios en el carrito
  calculateTotal() {
    this.totalAmount = this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  // Eliminar un producto del carrito
  removeFromCart(item: Result) {
    this.cartService.removeFromCart(item);
    this.loadCart(); // Recargar el carrito después de eliminar un producto
  }

  // Simular el pago y mostrar la pantalla de carga
  async simulatePayment() {
    // Mostrar la pantalla de carga
    const loading = await this.loadingCtrl.create({
      message: 'Making your payment...',
      spinner: 'crescent',
      duration: 2000
    });
    await loading.present();

    // Simular el proceso de pago
    setTimeout(async () => {
      // Ocultar la pantalla de carga
      await loading.dismiss();

      // Mostrar mensaje tipo toast
      const toast = await this.toastCtrl.create({
        message: 'Payed With success',
        duration: 2000,
        position: 'top',
        cssClass: 'custom-toast',
      });
      toast.present();

      // Vaciar el carrito después del pago
      this.cartService.clearCart();
      this.loadCart(); // Recargar el carrito después de vaciarlo

      // Redirigir a la página de inicio después de que el toast se muestra
      setTimeout(() => {
        this.navCtrl.navigateRoot('/home');
      }, 2000);
    }, 2000);
  }
}
