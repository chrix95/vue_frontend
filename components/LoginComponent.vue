<template>
    <form class="form-signin">
        <img class="mb-4" src="https://getbootstrap.com/docs/4.3/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus v-model="email">
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required v-model="password">
        <div class="checkbox mb-3">
            <label>
            <input type="checkbox" value="remember-me"> Remember me
            </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="button" @click="signin()" v-bind:disabled="btnDisabled">Sign in</button>
    </form>
</template>

<script>
    export default {
        data() {
            return {
                email: '',
                password: '',
                btnDisabled: false
            }
        },
        mounted()  {

        },
        methods: {
            signin() {
                this.btnDisabled = true;
                if ( this.validateEmail(this.email) ) {
                    if ( this.password ) {
                        axios.post(`${window.host}/login`, {
                            email: this.email, password: this.password
                        })
                        .then((resp) => {
                            this.btnDisabled = false;
                            if ( resp.status == 200 ) {
                                const body = resp.data;
                                if ( body.status ) {
                                    this.$store.commit("setToken", body.token);
                                    localStorage.setItem('token', body.token)
                                    this.$store.commit("setUser", body.account);
                                    alert(`Login Successful! - Welcome ${body.account.fname} ${body.account.lname}`);
                                    window.location.href="create-item.html";
                                } else {
                                    alert(body.account);
                                    return false;
                                }
                            } else {
                                alert(`Unable to complete request: ${resp.statusText}`);
                                return false;
                            }
                            console.log(resp);
                        })
                        .catch(err => {
                            console.log('error sending request!');
                            console.log(err);
                            this.btnDisabled = false;
                        })
                    } else {
                        alert('Password field is required!');
                        return false;
                        this.btnDisabled = false;
                    }
                } else {
                    alert('Please enter a valid e-mail');
                    return false;
                    this.btnDisabled = false;
                }
            },
            validateEmail(email) {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                    return (true);
                }
                return (false)
            }
        }
    }
</script>

<style scoped>
    html,
    body {
        height: 100%;
    }

    body {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        padding-top: 40px;
        padding-bottom: 40px;
        background-color: #f5f5f5;
    }

    .form-signin {
        width: 100%;
        max-width: 330px;
        padding: 15px;
        margin: auto;
        margin-top: 10%;
    }
    .form-signin .checkbox {
        font-weight: 400;
    }
    .form-signin .form-control {
        position: relative;
        box-sizing: border-box;
        height: auto;
        padding: 10px;
        font-size: 16px;
    }
    .form-signin .form-control:focus {
        z-index: 2;
    }
    .form-signin input[type="email"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }
    .form-signin input[type="password"] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
</style>

