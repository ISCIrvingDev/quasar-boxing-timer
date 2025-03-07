<template>
  <q-page padding>
    <q-card class="page-height">
      <q-card-section class="bg-primary-gradient text-accent">
        <div class="text-h5">{{ title }}</div>
      </q-card-section>

      <q-card-section>
        <q-btn
          color="secondary"
          text-color="secondary"
          outline
          label="Add Record"
          @click="useOpenDialogEditAdd()"
        />
      </q-card-section>

      <q-card-section>
        <!-- https://quasar.dev/vue-components/table#styling
        https://quasar.dev/style/color-palette#color-list -->
        <q-table
          :columns="columns"
          :rows="rows"
          separator="cell"
          row-key="id"
          color="accent"
          table-class="text-grey-8 bg-white"
          table-header-class="bg-primary-gradient text-accent"
          title="Department records"
          card-class="bg-primary-gradient text-accent"
        >
          <template v-slot:body-cell-actions="props">
            <q-td class="text-center">
              <q-btn
                color="secondary"
                flat
                round
                dense
                icon="description"
                @click="useOpenDialogDetails(props.row)"
              />
              <q-btn
                color="secondary"
                flat
                round
                dense
                icon="edit"
                @click="useOpenDialogEditAdd(props.row)"
              />
              <q-btn
                color="negative"
                flat
                round
                dense
                icon="delete"
                @click="useOpenDialogDelete(props.row.id)"
              />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>

    <!-- Dialogo para formulario Details -->
    <q-dialog v-model="isDialogOpenDetails">
      <q-card class="dialog-width">
        <q-card-section>
          <div class="text-h6">Record Details</div>
        </q-card-section>

        <q-card-section>
          <q-form>
            <q-input v-model="formData.key" label="Key" required readonly />

            <q-input v-model="formData.name" label="Name" required readonly />

            <q-input v-model="formData.description" label="Description" type="textarea" readonly />
            <div class="q-mt-md">
              <q-btn color="primary" label="Close" @click="isDialogOpenDetails = false" outline />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Dialogo para formulario Edit/Add -->
    <q-dialog v-model="isDialogEditAddOpen">
      <q-card class="dialog-width">
        <q-card-section>
          <div class="text-h6">{{ editMode ? 'Edit Record' : 'Add Record' }}</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit.prevent="useSaveRecord(appInputValidationService, deparmentService)">
            <q-input
              ref="keyRef"
              v-model="formData.key"
              label="Key"
              required
              lazy-rules
              :error="
                dtoValidations.length > 0 &&
                dtoValidations.findIndex((val) => val.property === 'key') !== -1
              "
            >
              <template v-slot:error>
                <!-- <p v-for="(value, key, index) in dtoValidations.find((val) => val.property === 'key').errMsn" :key="value.key"></p> -->
                <p
                  v-for="item in dtoValidations.find((val) => val.property === 'key').errMsn"
                  :key="item.key"
                >
                  * {{ item.value }}
                </p>
              </template>
            </q-input>

            <q-input
              ref="nameRef"
              v-model="formData.name"
              label="Name"
              required
              lazy-rules
              :error="
                dtoValidations.length > 0 &&
                dtoValidations.findIndex((val) => val.property === 'name') !== -1
              "
            >
              <template v-slot:error>
                <!-- <p v-for="(value, key, index) in dtoValidations.find((val) => val.property === 'name').errMsn" :key="value.name"></p> -->
                <p
                  v-for="item in dtoValidations.find((val) => val.property === 'name').errMsn"
                  :key="item.key"
                >
                  * {{ item.value }}
                </p>
              </template>
            </q-input>

            <q-input v-model="formData.description" label="Description" type="textarea" />

            <div class="q-mt-md">
              <q-btn type="submit" color="primary" label="Guardar" outline />
              <q-btn
                color="negative"
                label="Cancelar"
                flat
                @click="isDialogEditAddOpen = false"
                class="q-ml-md"
              />
              <q-btn color="primary" label="Reset" flat @click="useReset" class="q-ml-xl" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Dialogo para confirmar Delete -->
    <q-dialog v-model="isDialogDeleteOpen">
      <q-card class="dialog-width">
        <q-card-section>
          <div class="text-h6">Delete Record</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit.prevent="useDeleteRecord(deparmentService)">
            <div>Delete record with ID: {{ idDeleteRecord }}?</div>

            <div class="q-mt-md">
              <q-btn color="primary" label="Cancel" outline @click="isDialogDeleteOpen = false" />
              <q-btn type="submit" color="negative" label="Delete" flat class="q-ml-md" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
/*
 * Vue
 */
import { computed, inject } from 'vue'
import { useRoute } from 'vue-router'

/*
 * Composables
 */
import {
  useInit,
  // Metodos del "Presenter"
  useOpenDialogEditAdd,
  useOpenDialogDetails,
  useOpenDialogDelete,

  // Validations
  useReset,

  // Metodos del "Service"
  useSaveRecord,
  useDeleteRecord,
} from './department.composables'

/*
 * Constants
 */
import { columns } from './department.constants'

/*
 * Contract & Keys
 */
import type { IDeparmentContract } from 'src/application/api/services/department.contract'
import { DeparmentKey } from 'src/application/api/services/api.keys'
import { AppInputValidationKey } from 'src/application/validations/app-input-validation.keys'
import type { AppInputValidationService } from 'src/application/validations/app-input-validation.services'

/*
 * Services
 */
const deparmentService = inject<IDeparmentContract>(DeparmentKey)
const appInputValidationService = inject<AppInputValidationService>(AppInputValidationKey)

/*
 * Vue Reactivity
 */
const {
  editMode,
  formData,
  rows,
  idDeleteRecord,
  isDialogEditAddOpen,
  isDialogDeleteOpen,
  isDialogOpenDetails,
  dtoValidations,
} = useInit(deparmentService)

// Router
const route = useRoute()

// Titulo de la "Page"
const title = computed(() => (route.meta.title as string) || 'Box Timer')
</script>

<style lang="scss" scoped></style>
