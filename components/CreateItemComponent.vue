<template>
    <div>
        <div class="jumbotron">
            <div class="container">
                <h1 class="display-3">Bucket list database</h1>
                <h4>Use the form below to create a new bucket list</h4>
            </div>
        </div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-10">
                    <div class="row">
                        <div class="col-md-8">
                            <div class="card">
                                <div class="card-header">Bucket list</div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-hover table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Total Items</th>
                                                </tr>
                                            </thead>
                                            <tbody v-if="buckets.length > 0">
                                                <tr v-for="bucket in buckets" v-bind:key="bucket.id">
                                                    <td>{{ bucket.name }}</td>
                                                    <td>{{ bucket.items.length }}</td>
                                                </tr>
                                            </tbody>
                                            <tbody v-else>
                                                <tr>
                                                    <td colspan="2"><h4 class="text-center">No items found!</h4></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card">
                                <div class="card-header">Create new bucket</div>
                                <div class="card-body">
                                    <form action="">
                                        <div class="form-group">
                                            <label for="name" class="control-label">Name*</label>
                                            <input type="text" name="name" id="name" class="form-control" v-model="name" autocomplete="off">
                                            <p v-if="isName"> A new bucket item: {{ name }} will be created</p>
                                        </div>
                                        <button class="btn btn-success" type="button" v-bind:disabled="btnDisabled" @click="createBucket()">Create bucket</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: '',
                isName: false,
                btnDisabled: true,
                page: 0,
                limit: 20,
            }
        },
        methods: {
            getBucketList() {
                axios.get(`${window.host}/bucketlists?page=${this.page}&limit=${this.limit}`)
                .then((resp) => {
                    if (resp.status == 200) {
                        const body = resp.data;
                        this.$store.commit("setBucket", body.message);
                    } else {
                        alert(`Unable to get bucket list: ${resp.statusText}`);
                        return;
                    }
                })
                .catch(err => {
                    alert(`Unable to complete request: ${err.message}`);
                    return;
                });
            },
            createBucket() {
                this.btnDisabled = true;
                axios.post(`${window.host}/bucketlists`, {
                    name: this.name
                })
                .then((resp) => {
                    if (resp.status == 200) {
                        const body = resp.data;
                        if (body.status) {
                            this.$store.commit("setBucketList", body.message);
                        } else {
                            alert(`${body.message}`);
                        }
                        this.btnDisabled = false;
                    } else {
                        alert(`Request failed! ${resp.statusText}`);
                        this.btnDisabled = false;
                        return;
                    }
                })
                .catch( error => {
                    alert(`Unable to complete request: ${error.message}`);
                    this.btnDisabled = false;
                    return;
                });
            },
            checkAuth() {
                if ( this.$store.getToken ) {
                    alert('Please login to continue!');
                    window.location.href = "login.html";
                }
            }
        },
        mounted() {
            this.checkAuth();
            this.getBucketList();
        },
        watch: {
            name: function(val) {
                if (val.length >= 1) {
                    this.isName = true;
                    this.btnDisabled = false;
                } else {
                    this.isName = false;
                    this.btnDisabled = true;
                }
            },
        },
        computed: {
            buckets: function () {
                return this.$store.getters.getBucketList;
            }
        }
    }
</script>

