// src/components/RegistroForm/PersonalInfo.tsx
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { labelBaseClasses, inputBaseClasses, errorClasses } from '../styles';
import { Registro } from '../types';
import { departamentosColombia, ciudadesColombia, bancosColombia } from '@/constants/colombiaData';

interface PersonalInfoProps {
  register: UseFormRegister<Registro>;
  errors: FieldErrors<Registro>;
  tipoPersona: string;
  tipoDocumento: string;
}

export const PersonalInfo = ({ register, errors, tipoPersona, tipoDocumento }: PersonalInfoProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Tipo de Persona */}
    <div>
      <label className={labelBaseClasses}>Tipo de Persona</label>
      <select {...register('tipoPersona')} className={inputBaseClasses}>
        <option value="Natural">Natural</option>
        <option value="Juridica">Jurídica</option>
      </select>
      {errors.tipoPersona && (
        <p className={errorClasses}>{errors.tipoPersona.message}</p>
      )}
    </div>

    {/* Tipo de Documento */}
    <div>
      <label className={labelBaseClasses}>Tipo de Documento</label>
      <select {...register('tipoDocumento')} className={inputBaseClasses}>
        {tipoPersona === 'Natural' ? (
          <>
            <option value="CC">Cédula de Ciudadanía</option>
            <option value="CE">Cédula de Extranjería</option>
          </>
        ) : (
          <option value="NIT">NIT</option>
        )}
      </select>
      {errors.tipoDocumento && (
        <p className={errorClasses}>{errors.tipoDocumento.message}</p>
      )}
    </div>

    {/* Número de Documento */}
    <div>
      <label className={labelBaseClasses}>
        Número de {tipoDocumento === 'NIT' ? 'NIT' : 'Documento'}
      </label>
      <input
        type="text"
        {...register('numeroDocumento')}
        className={inputBaseClasses}
        placeholder={tipoDocumento === 'NIT' ? '900.123.456-7' : '1234567890'}
      />
      {errors.numeroDocumento && (
        <p className={errorClasses}>{errors.numeroDocumento.message}</p>
      )}
    </div>

    {/* Campos condicionales basados en tipo de persona */}
    {tipoPersona === 'Natural' ? (
      <>
        <div>
          <label className={labelBaseClasses}>Nombres</label>
          <input 
            type="text" 
            {...register('nombres')} 
            className={inputBaseClasses}
            placeholder="Nombres completos" 
          />
          {errors.nombres && <p className={errorClasses}>{errors.nombres.message}</p>}
        </div>
        <div>
          <label className={labelBaseClasses}>Apellidos</label>
          <input 
            type="text" 
            {...register('apellidos')} 
            className={inputBaseClasses}
            placeholder="Apellidos completos" 
          />
          {errors.apellidos && <p className={errorClasses}>{errors.apellidos.message}</p>}
        </div>
      </>
    ) : (
      <div className="col-span-2">
        <label className={labelBaseClasses}>Razón Social</label>
        <input 
          type="text" 
          {...register('razonSocial')} 
          className={inputBaseClasses}
          placeholder="Nombre de la empresa" 
        />
        {errors.razonSocial && <p className={errorClasses}>{errors.razonSocial.message}</p>}
      </div>
    )}

    {/* Información de Contacto */}
    <div>
      <label className={labelBaseClasses}>Teléfono</label>
      <input
        type="tel"
        {...register('telefono')}
        className={inputBaseClasses}
        placeholder="300 123 4567"
      />
      {errors.telefono && <p className={errorClasses}>{errors.telefono.message}</p>}
    </div>

    <div>
      <label className={labelBaseClasses}>Correo Electrónico</label>
      <input
        type="email"
        {...register('correoElectronico')}
        className={inputBaseClasses}
        placeholder="ejemplo@correo.com"
      />
      {errors.correoElectronico && (
        <p className={errorClasses}>{errors.correoElectronico.message}</p>
      )}
    </div>

    {/* Dirección y Ubicación */}
    <div className="col-span-2">
      <label className={labelBaseClasses}>Dirección</label>
      <input
        type="text"
        {...register('direccion')}
        className={inputBaseClasses}
        placeholder="Dirección completa"
      />
      {errors.direccion && <p className={errorClasses}>{errors.direccion.message}</p>}
    </div>

    <div>
      <label className={labelBaseClasses}>Departamento</label>
      <select {...register('departamento')} className={inputBaseClasses}>
        {departamentosColombia.map((depto) => (
          <option key={depto} value={depto}>{depto}</option>
        ))}
      </select>
      {errors.departamento && (
        <p className={errorClasses}>{errors.departamento.message}</p>
      )}
    </div>

    <div>
      <label className={labelBaseClasses}>Ciudad</label>
      <select {...register('ciudad')} className={inputBaseClasses}>
        {ciudadesColombia.map((ciudad) => (
          <option key={ciudad} value={ciudad}>{ciudad}</option>
        ))}
      </select>
      {errors.ciudad && <p className={errorClasses}>{errors.ciudad.message}</p>}
    </div>

    {/* Información Bancaria */}
    <div>
      <label className={labelBaseClasses}>Banco</label>
      <select {...register('banco')} className={inputBaseClasses}>
        {bancosColombia.map((banco) => (
          <option key={banco} value={banco}>{banco}</option>
        ))}
      </select>
      {errors.banco && <p className={errorClasses}>{errors.banco.message}</p>}
    </div>

    <div>
      <label className={labelBaseClasses}>Tipo de Cuenta</label>
      <select {...register('tipoCuenta')} className={inputBaseClasses}>
        <option value="Ahorros">Ahorros</option>
        <option value="Corriente">Corriente</option>
      </select>
      {errors.tipoCuenta && <p className={errorClasses}>{errors.tipoCuenta.message}</p>}
    </div>

    <div>
      <label className={labelBaseClasses}>Número de Cuenta</label>
      <input
        type="text"
        {...register('numeroCuenta')}
        className={inputBaseClasses}
        placeholder="Número de cuenta bancaria"
      />
      {errors.numeroCuenta && (
        <p className={errorClasses}>{errors.numeroCuenta.message}</p>
      )}
    </div>

    {/* Descripción del Servicio */}
    <div className="col-span-2">
      <label className={labelBaseClasses}>Descripción del Servicio</label>
      <textarea
        {...register('servicioDescripcion')}
        rows={4}
        className={inputBaseClasses}
        placeholder="Describa los servicios que presta..."
      />
      {errors.servicioDescripcion && (
        <p className={errorClasses}>{errors.servicioDescripcion.message}</p>
      )}
    </div>
  </div>
);