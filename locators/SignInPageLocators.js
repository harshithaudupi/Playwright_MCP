// SignInPageLocators.js
export class SignInPageLocators{
     constructor(page) {
    
     this.usernameInput=page.locator('input[name="login"]'),
     this.passwordInput=page.locator('input[name="passwd"]'),
     this.signInButton=page.locator('role=button[name="Log In"]'),
     this.codeInput=page.getByPlaceholder('Enter the code'),
     this.errorMsg=page.locator('span#div_login_error')
  
  }
    
};
