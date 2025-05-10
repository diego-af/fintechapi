{
"id": "uuid",
"name": "string",
"email": "string",
"password": "string (hash)",
"created_at": "datetime",
"updated_at": "datetime"
}

2. Contas (Accounts)
   {
   "id": "uuid",
   "user_id": "uuid",
   "name": "string",
   "type": "enum (corrente, poupança, investimento, cartão de crédito)",
   "balance": "decimal",
   "currency": "string",
   "icon": "string (opcional)",
   "color": "string (opcional)",
   "is_active": "boolean",
   "created_at": "datetime",
   "updated_at": "datetime"
   }
3. Categorias (Categories)
   {
   "id": "uuid",
   "user_id": "uuid",
   "name": "string",
   "type": "enum (receita, despesa)",
   "icon": "string (opcional)",
   "color": "string (opcional)",
   "created_at": "datetime",
   "updated_at": "datetime"
   }
4. Transações (Transactions)
   {
   "id": "uuid",
   "user_id": "uuid",
   "account_id": "uuid",
   "category_id": "uuid",
   "amount": "decimal",
   "type": "enum (receita, despesa, transferência)",
   "description": "string",
   "date": "date",
   "is_paid": "boolean",
   "notes": "string (opcional)",
   "is_recurring": "boolean",
   "recurrence_id": "uuid (opcional)",
   "created_at": "datetime",
   "updated_at": "datetime"
   }
5. Recorrências (Recurrences)
   {
   "id": "uuid",
   "user_id": "uuid",
   "frequency": "enum (diária, semanal, mensal, anual)",
   "interval": "integer",
   "start_date": "date",
   "end_date": "date (opcional)",
   "created_at": "datetime",
   "updated_at": "datetime"
   }
6. Orçamentos (Budgets)
   {
   "id": "uuid",
   "user_id": "uuid",
   "category_id": "uuid",
   "amount": "decimal",
   "period": "enum (semanal, mensal, anual)",
   "start_date": "date",
   "end_date": "date",
   "created_at": "datetime",
   "updated_at": "datetime"
   }
7. Metas Financeiras (Financial Goals)
   {
   "id": "uuid",
   "user_id": "uuid",
   "name": "string",
   "target_amount": "decimal",
   "current_amount": "decimal",
   "start_date": "date",
   "target_date": "date",
   "status": "enum (em andamento, concluída, cancelada)",
   "notes": "string (opcional)",
   "created_at": "datetime",
   "updated_at": "datetime"
   }