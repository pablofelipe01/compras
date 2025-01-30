export function ItemsList({ register, errors }: ItemsListProps) {
  const itemsCount = 5;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white">Items</h3>
      
      {Array.from({ length: itemsCount }).map((_, index) => {
        const num = index + 1;
        const descripcionKey = `item${num}_descripcion` as const;
        const valorKey = `item${num}_valor` as const;
        const isRequired = num === 1;

        return (
          <div key={num} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Descripción {num} {isRequired && <span className="text-red-500">*</span>}
              </label>
              <input
                type="text"
                {...register(descripcionKey, {
                  required: isRequired ? 'Este campo es requerido' : false
                })}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                placeholder={isRequired ? 'Descripción requerida' : 'Opcional'}
              />
              {errors[descripcionKey] && (
                <p className="mt-1 text-sm text-red-500">
                  {errors[descripcionKey]?.message}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Valor {num} {isRequired && <span className="text-red-500">*</span>}
              </label>
              <input
                type="number"
                {...register(valorKey, {
                  required: isRequired ? 'Este campo es requerido' : false,
                  valueAsNumber: true,
                  min: {
                    value: isRequired ? 1 : 0,
                    message: isRequired ? 'El valor debe ser mayor a 0' : undefined
                  }
                })}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                placeholder={isRequired ? '0' : 'Opcional'}
              />
              {errors[valorKey] && (
                <p className="mt-1 text-sm text-red-500">
                  {errors[valorKey]?.message}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}