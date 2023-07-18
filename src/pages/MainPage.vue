<script setup>


</script>

<template>
  <div class="q-pa-md  row  q-gutter-xs  ">
    <q-card class="my-card q-mt-xll col-6 row text-white offset-1 "  style="background: radial-gradient(circle, #7bb5eb 0%, #076bc2 100%);height: auto;" flat bordered>
      <q-card-section horizontal class="row">
        <q-card-section class="q-pt-xs col-7 " >
          <div class="text-h4 q-mt-sm q-mb-xs">Bienvenido Camilo </div>
          <div class="text-caption2 ">
            Bienvenido de nuevo a AddCliente, nos complace inspirar el mejor trabajo en las personas para que puedan alcanzar sus objetivos.        </div>
        </q-card-section>

        <q-card-section class="col-4  bottom-c ">
          <q-img
            class="rounded-borders absolute-center "
            src="../assets/img/empresario-ejecutivo.png "
            style="height: 190px; max-width: 130px"
            fit="fill"
          />
        </q-card-section>
      </q-card-section>
    </q-card>
    <q-card
      class="my-card text-white q-mt-xll col-3 "
      style="background: radial-gradient(circle, #7bb5eb 0%, #076bc2 100%)"
    >
      <q-card-section>
        <div class="text-h6">En nuestra plataforma podrás registrar tus clientes</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <p> Dando click en el icono de agregar clientes <q-icon name="mdi-account-plus"></q-icon> podrás comenzar a registrar todos tu clientes  </p>
      </q-card-section>
    </q-card>

    <q-card
      class="my-card text-white col-9 offset-1"
      style="background: radial-gradient(circle, #7bb5eb 0%, #076bc2 100%); "
    >
  <q-card-section>
    <div class="text-h6">También podrás acceder a las estadísticas de registro </div>
  </q-card-section>

  <q-card-section class="q-pt-none">
    <p> Yendo al icono Dashboard podrás visualizar todas las gráficas sobre los datos de registro de tus clientes  <q-icon name="mdi-view-dashboard"></q-icon>   </p>
  </q-card-section>
</q-card>
  </div>
</template>

<style scope>
.bottom-c{
  bottom: 12px;
}
.q-mt-xll{
  margin-top: 4.5%;
}
.bottom{
  top: 40%;
}
</style>
