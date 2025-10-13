# Roteiro para fazer o CRUD do Autor

## Listagem dos Autores `[GET]`
1. Analisar o swagger [Swagger](https://api.franciscosensaulas.com/swagger/index.html)
2. Criar modelo `autor.dto.ts` dentro de `src\app\models`
    Ex.:
    ```ts
    export interface AutorResponse {
        id: number;
        ..... // demais proprieades
    }
    ```
2. Criar service `autor.service.ts` dentro `src\app\services`

    - Abrir o terminal na pasta `services`
    - Executar o comando
        `ng g service autor.service`
    - Abrir o serviço criado `autor.service.ts`
    - Criar propriedade da URL
        ```ts
        export class CategoriaService {
            url = "https://api.franciscosensaulas.com/api/v1/biblioteca/autores"
        }
        ```
    - Criar contrutor (com HttpClient)
        ```ts
        export class CategoriaService {
            url = "https://api.franciscosensaulas.com/api/v1/biblioteca/categorias"

            constructor(private httpClient: HttpClient) { }
        }
        ```
    - Criar o método que fará a requisição
        ```ts
        getAll(): Observable<AutorResponse[]> {
            return this.httpClient.get<AutorResponse[]>(this.url);
        }
        ```
2. Criar pasta autores dentro de `src\app\pages`
2. Criar o componente de lista dentro de `src\app\pages\autores`
    - `ng g c list`
    - Alterar o nome da classe de `List` para `AutorList`
2. Adicionar rota no arquivo `app.routes.ts`
    - Adicionar rota:
        ```ts
        { path: "autores", component: AutorList },
        ```
    - Importar o AutorList
2. Rodar e validar se chegou até a rota: `https://localhost:4200/autores`
2. Adicionar a lista no componente `src\app\pages\autores\list\list.ts`
    ```ts
    autores: AutorResponse[] = [];
    ```
2. Importar Módulo da Tabela no componente `src\app\pages\autores\list\list.ts`
    ```ts
    imports: [..., TableModule, CommonModule, ...],
    ```
2. Adicionar o `p-table` no componente `src\app\pages\autores\list\list.html`
    ```html
    <p-table [value]="autores" [tableStyle]="{ 'min-width': '50rem' }">
        <ng-template #header>
            <tr>
                <th>Código</th>
                <th>Nome</th>
                <th></th>
            </tr>
        </ng-template>
        <ng-template #body let-autor>
            <tr>
                <td>{{ autor.id }}</td>
                <td>{{ autor.nome }}</td>
                <td class="flex gap-2">
                    <!-- Depois será adicionado os botões -->
                </td>
            </tr>
        </ng-template>
    </p-table>
    ```
2. Rodar e validar a tabela é apresentada com o cabeçalho (sem os dados) `https://localhost:4200/autores`
2. Implementar consulta dos autores no componente
    - Adicionar construtor `src\app\pages\autores\list\list.ts`
        ```ts
        constructor(private autorService: AutorService) {
        }
        ```
    - Adicionar o ngOnInit
        ```ts
        ngOnInit() {
            this.carregarAutores();
        }
        ```
    - Criar função de carregametno das autores
        ```ts
        private carregarAutores() {
            this.autorService.getAll().subscribe({
            next: autores => this.autores = autores,
            error: erro => {
                alert("Não foi possível carregar as autores");
                console.error("Ocorreu um erro ao carregar as autores: " + erro)
            }
            });
        }
        ```
2. Rodar e validar que os dados são apresentados (tem que previamenter ter cadastrado algum registro) `https://localhost:4200/autores`

## Criar Autor `[POST]`
1. Analisar o swagger [Swagger](https://api.franciscosensaulas.com/swagger/index.html)
2. Criar modelo `autor.dto.ts` dentro de `src\app\models`
    Ex.:
    ```ts
    export interface AutorCadastroRequest{
        // Colocar proprieades do Swagger (cuidado com obrigatórios)
    }
    ```
2. Ajustar service `autor.service.ts` dentro `src\app\services` para adicionar cadastro
    - Criar o método que fará a requisição para cadastrar
        ```ts
        create(form: AutorCadastroRequest): Observable<void> {
            return this.httpClient.post<void>(this.url, form);
        }
        ```
2. Criar o componente de criação dentro de `src\app\pages\autores`
    `ng g c create`
    Alterar o nome da classe de `Create` para `AutorCreate`
2. Adicionar rota no arquivo `app.routes.ts`
    - Adicionar rota:
        ```ts
        { path: "autores/cadastrar", component: AutorCreate },
        ```
    - Importar o AutorCreate
2. Rodar e validar se chegou até a rota: `https://localhost:4200/autores/cadastrar`
2. Adicionar botão de acesso a tela de cadastrar

    - Importar ButtonModule `src\app\pages\autores\list\list.ts`
    - Adicionar no componente `src\app\pages\autores\list\list.html` o botão
        ```html
        <p-button label="Cadastrar" severity="info" icon="pi pi-plus" routerLink="cadastrar" />
        ```
2. Rodar e validar se a Lista direciona para o Cadastro: 
    - Acessar `https://localhost:4200/autores`
    - Clicar `Cadastrar` e validar que redirecionou para o Cadastro do Autor


2. Adicionar os imports `src\app\pages\autores\create\create.ts`
    ```ts
    imports: [FormsModule, ButtonModule, ...],
    ```
2. Adicionar o form (que permitirá o usuário preencher os dados) `src\app\pages\autores\create\create.ts`
    - Colocar propriedade do form
        ```ts
        form: AutorCadastroRequest;
        ```
    - Criar o construtor e instanciar o form
        ```ts
        constructor(
            private autorService: AutorService,
            private router: Router,
        ){
            // Inicializa o formulário com valores padrão.
            this.form = {
                // Preencher todas as proprieades obrigatórias do `AutorCadastroRequest`
            };
        }

        salvar(){

        }
        ```
2. Colocar os campos no html que preenchem o form `src\app\pages\autores\create\create.html`
2. Criar método que fará a requisição cadastrando o registro (front => back) `src\app\services\autor.service.ts`
    ```ts
    create(form: AutorCadastroRequest): Observable<void> {
        return this.httpClient.post<void>(this.url, form);
    }
    ```
2. Ajustar a função salvar (que estava vazia) para chamar a função do serviço que comunicará com o back-end `src\app\pages\autores\create\create.ts`
    ```ts
    salvar(){
        this.autorService.create(this.form).subscribe({
            next: _ => this.router.navigate(["/autores"]),
            error: erro => {
                alert("Não foi possível cadastrar a autor");
                console.error(erro);
            } 
        })
    }
    ```

2. Rodar e validar que o cadastro funciona
    - Acessar a lista => botão Cadastrar `https://localhost:4200/autores`
    - Preencher o formulário
    - Abrir o Network das Ferramentas do Desenvolvedor
    - Validar que cadastrou e redicionou para lista

## Apagar Autor `[DELETE]`
1. Analisar o swagger [Swagger](https://api.franciscosensaulas.com/swagger/index.html)
2. Ajustar service `autor.service.ts` dentro `src\app\services` para adicionar excluir
    - Criar o método que fará a requisição para apagar
        ```ts
        delete(id: number): Observable<void> {
            const urlApagar = `${this.url}/${id}`;
            return this.httpClient.delete<void>(urlApagar);
        }
        ```
2. Adicionar a função para apagar `src\app\pages\autores\list\list.ts`
    ```ts
    apagar(id: number) {
        this.autorService.delete(id).subscribe({
            next: _ => this.carregarAutores(),
            error: erro => {
                alert("Não foi possível apagar a autor")
                console.error("Ocorreu um erro ao apagar as autor: " + erro)
            }
        })
    }
    ```
2. Adicionar botão de apagar na listagem de autores `src\app\pages\autores\list\list.html`
    - Adicionar no componente `src\app\pages\autores\list\list.html` o botão de apagar
        ```html
        <ng-template #body let-autor>
            <tr>
                ...
                <td class="flex gap-2">
                    <p-button 
                        (click)="apagar(autor.id)" 
                        label="Apagar" 
                        icon="pi pi-trash" 
                        outlined severity="danger" /> 
                </td>
            </tr>
        </ng-template>
        ```
2. Rodar e validar que o apagar funciona
    - Acessar a lista `https://localhost:4200/autores`
    - Abrir o Network das Ferramentas do Desenvolvedor
    - Botão de Apagar
    - Validar que apagou e atualizou a lista

src/app/pages/livros

ng g c create --skip-tests --inline-style --inline-template --flat
ng g c edit --skip-tests --inline-style --inline-template --flat
ng g c list --skip-tests --inline-style --inline-template --flat