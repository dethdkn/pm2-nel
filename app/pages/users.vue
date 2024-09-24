<script setup lang="ts">
const { t } = useI18n()
const { user } = useUserSession()

useHead({ title: t('users.full_title') })

const columns = computed(() => [
  { key: 'name', label: t('users.username'), sortable: true },
  { key: 'level', label: t('users.level'), sortable: true },
  { key: 'actions', label: t('general.actions') },
])

const page = ref(1)
const q = ref('')
const search = refDebounced(q, 1000)
const sort = ref<{ column: string, direction: 'asc' | 'desc' }>({ column: 'name', direction: 'asc' })
watch(search, () => page.value = 1)

const { data, refresh, status } = useFetch('/api/fetch/users', { method: 'POST', body: { page, search, sort }, default: () => ({ users: [], total: 0 }), lazy: true })
const pending = computed(() => status.value === 'pending')

const newUserModal = ref(false)

const deleteUserModal = ref(false)
const deleteID = ref(0)
const deleteUsername = ref('')
function openDeleteUserModal(id: number, username: string){
  deleteID.value = id
  deleteUsername.value = username
  deleteUserModal.value = true
}

const editUserModal = ref(false)
const editID = ref(0)
const editUsername = ref('')
const editLevel = ref('')
function openEditUserModal(id: number, username: string, level: string){
  editID.value = id
  editUsername.value = username
  editLevel.value = level
  editUserModal.value = true
}
</script>

<template>
  <section class="mx-auto max-w-7xl px-4">
    <div class="flex flex-col items-center justify-center space-y-3 py-3 sm:flex-row sm:justify-between">
      <UInput v-model="q" icon="i-heroicons-magnifying-glass-20-solid" :placeholder="t('general.search')" />
      <div class="flex items-center justify-center space-x-4">
        <UButton icon="i-heroicons-arrow-path-20-solid" :label="t('users.update_users')" color="blue" :loading="pending" @click="refresh" />
        <UButton icon="i-heroicons-user-plus" :label="t('users.new_user')" color="green" @click="newUserModal = true" />
      </div>
    </div>
    <UTable v-model:sort="sort" :rows="data.users" :columns :loading="pending" sort-mode="manual" :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: t('general.loading') }" :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: t('users.no_users') }">
      <template #name-data="{ row }">
        <UBadge :label="row.name" color="green" variant="outline" size="xs" />
      </template>
      <template #level-data="{ row }">
        <UBadge v-if="row.level === 'admin'" :label="t('general.admin')" color="red" variant="outline" size="xs" />
        <UBadge v-else :label="t('general.user')" color="blue" variant="outline" size="xs" />
      </template>
      <template #actions-data="{ row }">
        <div class="flex items-center space-x-2">
          <ClientOnly>
            <UTooltip :text="t('users.edit_user')" :popper="{ placement: 'top' }">
              <UButton icon="i-heroicons-pencil-square-20-solid" size="2xs" color="blue" variant="soft" :ui="{ rounded: 'rounded-full' }" :disabled="row.name === user?.username" @click="openEditUserModal(row.id, row.name, row.level)" />
            </UTooltip>
            <UTooltip :text="t('users.delete_user')" :popper="{ placement: 'top' }">
              <UButton icon="i-heroicons-trash-20-solid" size="2xs" color="red" variant="soft" :ui="{ rounded: 'rounded-full' }" :disabled="row.name === user?.username" @click="openDeleteUserModal(row.id, row.name)" />
            </UTooltip>
            <template #fallback>
              <div class="size-6 animate-pulse rounded-full bg-blue-100 dark:bg-blue-900" />
              <div class="size-6 animate-pulse rounded-full bg-red-100 dark:bg-red-900" />
            </template>
          </ClientOnly>
        </div>
      </template>
    </UTable>
    <div class="flex justify-center sm:justify-end">
      <ClientOnly>
        <UPagination v-model="page" :page-count="10" :total="data.total" />
      </ClientOnly>
    </div>
    <ModalNewUser v-model="newUserModal" @update="refresh" />
    <ModalEditUser v-model="editUserModal" v-model:id="editID" v-model:username="editUsername" v-model:level="editLevel" @update="refresh" />
    <ModalDeleteUser v-model="deleteUserModal" v-model:id="deleteID" v-model:username="deleteUsername" @update="refresh" />
  </section>
</template>
